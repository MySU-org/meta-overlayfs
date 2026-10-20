export default class DashboardPage {
    constructor(app) {
        this.app = app;
        this.data = {
            deviceInfo: { model: '—', android: '—' },
            mysuVersion: '—',
            stealth: { enabled: false, version: 'N/A', variant: 'Standard' },
            moduleStats: { total: 0, active: 0, inactive: 0, updating: 0, uninstalling: 0 },
            partitionData: [],
            storageUsage: { total: 0, used: 0, free: 0, percent: 0, mounted: true, exists: true, freeFormatted: '0 B' }
        };
    }

    async render() {
        await this.loadData();
        return this.buildHTML();
    }

    buildHTML() {
        const { storageUsage, moduleStats, deviceInfo, mysuVersion, partitionData, stealth } = this.data;
        const total = storageUsage.total || 1;
        const free = storageUsage.free || 0;
        const c = 2 * Math.PI * 58;

        const colors = {
            'system': { hex: '#f87171', var: '--red', filter: 'glow-red' },
            'product': { hex: '#22d3ee', var: '--cyan', filter: 'glow-cyan' },
            'vendor': { hex: '#34d399', var: '--green', filter: 'glow-green' },
            'system_ext': { hex: '#fbbf24', var: '--yellow', filter: 'glow-yellow' },
            'odm': { hex: '#a78bfa', var: '--violet', filter: 'glow-violet' },
            'oem': { hex: '#fb923c', var: '--orange', filter: 'glow-orange' }
        };

        let svgSegments = '';
        let legendHtml = '';
        let rowsHtml = '';
        let offset = 0;

        for (const p of partitionData) {
            let pct = (p.bytes / total) * 100;
            if (pct > 0 && pct < 0.1) pct = 0.1;
            pct = parseFloat(pct.toFixed(1));

            const dash = `${(pct / 100) * c} ${c}`;
            const currentOffset = offset;
            offset -= ((pct / 100) * c);

            const cDef = colors[p.name] || { hex: '#ffffff', var: '--text', filter: '' };
            const pName = p.name.charAt(0).toUpperCase() + p.name.slice(1);

            svgSegments += `<circle cx="80" cy="80" r="58" class="donut-seg" stroke="${cDef.hex}" stroke-dasharray="${dash}" stroke-dashoffset="${currentOffset}" ${cDef.filter ? `filter="url(#${cDef.filter})"` : ''} />`;

            legendHtml += `
                <div class="legend-item">
                    <div class="legend-dot" style="background:${cDef.hex};color:${cDef.hex};box-shadow:0 0 8px currentColor;"></div>
                    <div class="legend-info">
                        <div class="legend-name">${pName}</div>
                        <div class="legend-pct" style="color:var(${cDef.var})">${pct}% · ${this.app.utils.formatBytes(p.bytes)}</div>
                    </div>
                </div>`;

            rowsHtml += `
                <div class="partition-row">
                    <div class="partition-icon" style="background:var(${cDef.var}-dim);border-color:rgba(255,255,255,0.1);color:var(${cDef.var});">${p.name.substring(0,3)}</div>
                    <div class="partition-info">
                        <div class="partition-name">${pName}</div>
                        <div class="partition-sub">Overlay payload</div>
                        <div class="partition-bar">
                            <div class="partition-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,var(${cDef.var}),transparent);"></div>
                        </div>
                    </div>
                    <div class="partition-right">
                        <div class="partition-pct" style="color:var(${cDef.var})">${pct}%</div>
                        <div class="partition-bytes">${this.app.utils.formatBytes(p.bytes)}</div>
                    </div>
                </div>`;
        }

        let freePct = (free / total) * 100;
        if (freePct > 0 && freePct < 0.1) freePct = 0.1;
        freePct = parseFloat(freePct.toFixed(1));

        const freeDash = `${(freePct / 100) * c} ${c}`;
        svgSegments += `<circle cx="80" cy="80" r="58" class="donut-seg part-free" stroke-dasharray="${freeDash}" stroke-dashoffset="${offset}"/>`;

        const stealthStatusClass = stealth.enabled ? 'ok' : 'warn';
        const stealthStatusText = stealth.enabled ? 'Protected' : 'Standard';

        const statsHtml = [];
        statsHtml.push(`<span class="text-green">${moduleStats.active} Active</span>`);
        if (moduleStats.inactive > 0) statsHtml.push(`<span class="text-red">${moduleStats.inactive} Disabled</span>`);
        if (moduleStats.updating > 0) statsHtml.push(`<span class="text-yellow">${moduleStats.updating} Update</span>`);
        if (moduleStats.uninstalling > 0) statsHtml.push(`<span class="text-red-dim">${moduleStats.uninstalling} Uninstall</span>`);

        return `
        <div class="dashboard-page">
            <div class="storage-donut-card">
                <div class="donut-wrap">
                    <div class="donut-svg-wrap">
                        <svg class="donut-svg" viewBox="0 0 160 160">
                            <defs>
                                <filter id="glow-red"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-cyan"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-green"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-yellow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-violet"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                <filter id="glow-orange"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                            </defs>
                            <circle cx="80" cy="80" r="58" class="donut-bg"/>
                            ${svgSegments}
                        </svg>
                        <div class="donut-center">
                            <div class="donut-center-pct">Storage</div>
                            <div class="donut-center-label">${this.app.utils.formatBytes(total)}</div>
                        </div>
                    </div>
                    <div class="donut-legend">
                        ${legendHtml}
                        <div class="legend-item">
                            <div class="legend-dot part-free"></div>
                            <div class="legend-info">
                                <div class="legend-name">Free (/data)</div>
                                <div class="legend-pct part-free-text">${freePct}% · ${storageUsage.freeFormatted}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="partition-rows">
                    ${rowsHtml}
                    <div class="partition-row">
                        <div class="partition-icon part-free">DAT</div>
                        <div class="partition-info">
                            <div class="partition-name">Available Space</div>
                            <div class="partition-sub">Direct module storage in /data</div>
                        </div>
                        <div class="partition-right">
                            <div class="partition-pct part-free-text">${freePct}%</div>
                            <div class="partition-bytes">${storageUsage.freeFormatted}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stat-chip-wide" id="btn-view-modules" role="button">
                <div class="scw-icon">
                    ${this.app.icon('cubes')}
                </div>
                <div class="scw-info">
                    <div class="scw-title">${moduleStats.total} Modules Installed</div>
                    <div class="scw-stats">
                        ${statsHtml.join('<span>·</span>')}
                    </div>
                </div>
                <div class="scw-arrow">
                    <svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                </div>
            </div>

            <div class="info-pair">
                <div class="info-glass info-full">
                    <div class="info-glass-header">
                        <div class="info-glass-title">MYSUFS Stealth</div>
                        <span class="info-glass-tag ${stealthStatusClass}">${stealthStatusText}</span>
                    </div>
                    <div class="info-rows-grid">
                        <div class="info-row"><span class="k">Kernel VFS</span><span class="v ${stealthStatusClass}">${stealth.enabled ? 'Cloaked' : 'Standard'}</span></div>
                        <div class="info-row"><span class="k">Version</span><span class="v ok">${stealth.version}</span></div>
                        <div class="info-row"><span class="k">Variant</span><span class="v">${stealth.variant}</span></div>
                    </div>
                </div>

                <div class="info-glass info-full">
                    <div class="info-glass-header">
                        <div class="info-glass-title">Device</div>
                        <span class="info-glass-tag">${mysuVersion}</span>
                    </div>
                    <div class="info-rows-grid">
                        <div class="info-row"><span class="k">Model</span><span class="v">${deviceInfo.model}</span></div>
                        <div class="info-row"><span class="k">Android</span><span class="v">${deviceInfo.android}</span></div>
                        <div class="info-row"><span class="k">Root Engine</span><span class="v ok">MySU Active</span></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    async loadData() {
        try {
            const utils = this.app.utils;
            const propsCmd = `getprop ro.product.model; echo "|||"; getprop ro.build.version.release; echo "|||"; mysud -V 2>/dev/null || echo "—"`;
            const propsOut = await utils.execCommand(propsCmd);
            const [model, android, mysuVersion] = propsOut.split('|||').map(s => s.trim());

            const [modules, stealth, storageUsage] = await Promise.all([
                this.getModules(),
                utils.getStealthInfo(),
                utils.getStorageUsage()
            ]);

            this.data.deviceInfo = { model: model || '—', android: android || '—' };
            this.data.mysuVersion = mysuVersion || '—';
            this.data.stealth = stealth;
            this.data.storageUsage = storageUsage;
            this.data.moduleStats = {
                total: modules.length,
                active: modules.filter(m => m.enabled && !m.removePending).length,
                inactive: modules.filter(m => !m.enabled && !m.removePending).length,
                updating: modules.filter(m => m.hasUpdate).length,
                uninstalling: modules.filter(m => m.removePending).length
            };

            this.data.partitionData = [];

            const partsCmd = `
                for p in system vendor product system_ext odm oem; do
                    sz=0
                    for d in "${CONFIG.MODULES_DIR}"/*/"$p"; do
                        if [ -d "$d" ]; then
                            k=$(du -sk "$d" 2>/dev/null | awk '{print $1}')
                            if [ -n "$k" ]; then
                                sz=$((sz + k))
                            fi
                        fi
                    done
                    if [ "$sz" -gt 0 ]; then
                        echo "$p|$sz"
                    fi
                done
            `;
            const out = await utils.execCommand(partsCmd);
            if (out) {
                out.trim().split('\n').forEach(line => {
                    const parts = line.split('|');
                    if (parts.length === 2) {
                        const val = (parseInt(parts[1].trim()) || 0) * 1024;
                        if (val > 0) this.data.partitionData.push({ name: parts[0].trim(), bytes: val });
                    }
                });
            }
        } catch (err) {}
    }

    async getModules() {
        try {
            const utils = this.app.utils;
            const cmd = `
                sizes=$(du -sk "${CONFIG.MODULES_DIR}"/* 2>/dev/null)
                ls -1 "${CONFIG.MODULES_DIR}" 2>/dev/null | grep -v 'lost+found' | grep -v '_update$' | while read -r id; do
                    [ -z "$id" ] && continue
                    p="${CONFIG.MODULES_DIR}/$id"
                    [ ! -d "$p" ] && continue
                    name=$(grep "^name=" "$p/module.prop" 2>/dev/null | cut -d'=' -f2-)
                    [ -z "$name" ] && name=""
                    exists=1
                    upd=$([ -f "$p/update" ] && echo "1" || echo "0")
                    rmv=$([ -f "$p/remove" ] && echo "1" || echo "0")
                    dis=$([ -f "$p/disable" ] || [ -f "$p/.disable" ] && echo "1" || echo "0")
                    size=$(echo "$sizes" | grep -w "$p" | awk '{print $1}')
                    [ -z "$size" ] && size=0
                    echo "$id|__NAME__|$name|__STAT__|$exists|$upd|$rmv|$dis|$size"
                done
            `;
            const out = await utils.execCommand(cmd);
            if (!out) return [];

            const modules = [];
            const lines = out.trim().split('\n');

            for (const line of lines) {
                if (!line.includes('|__NAME__|')) continue;
                const parts = line.split('|__STAT__|');
                const [id, namePart] = parts[0].split('|__NAME__|');
                const [existsStr, updStr, rmvStr, disStr, sizeStr] = parts[1].split('|');

                const exists = existsStr === '1';
                const hasUpdate = updStr === '1';
                const removePending = rmvStr === '1';
                const disabled = disStr === '1';
                const name = namePart.trim() || id;
                const sizeBytes = (parseInt(sizeStr) || 0) * 1024;
                const enabled = exists ? !disabled : false;

                modules.push({
                    id,
                    name,
                    enabled,
                    hasUpdate,
                    removePending,
                    sizeFormatted: utils.formatBytes(sizeBytes)
                });
            }
            return modules;
        } catch (err) {
            return [];
        }
    }

    bindEvents() {
        const btn = document.getElementById('btn-view-modules');
        if (btn) btn.addEventListener('click', () => this.app.navigateTo('modules'));
    }
}