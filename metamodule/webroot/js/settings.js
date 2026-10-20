export default class SettingsPage {
    constructor(app) {
        this.app = app;
        this.data = {
            stealth: { enabled: false, version: 'N/A', variant: 'Standard' },
            storageUsage: '—',
            moduleId: 'meta-myoverlayfs',
            removePending: false
        };
    }

    async render() {
        await this.loadData();
        return this.buildHTML();
    }

    buildHTML() {
        const { stealth, storageUsage, removePending } = this.data;
        const stealthCls = stealth.enabled ? 'text-green' : 'text-yellow';
        const stealthVal = stealth.enabled ? 'MYSUFS Engaged' : 'Standard Fallback';

        return `
        <div class="settings-page">
            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon('sliders')}
                    </div>
                    <div class="s-plane-title">Engine Configuration</div>
                </div>
                <div class="s-row">
                    <div class="s-row-icon icon-green">
                        ${this.app.icon('shield')}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Stealth Subsystem</div>
                        <div class="s-row-sub">Ring-0 VFS Interception & Stat Spoofing</div>
                    </div>
                    <span class="s-row-value ${stealthCls}" id="settings-stealth-status">${stealthVal}</span>
                </div>
                <div class="s-row">
                    <div class="s-row-icon icon-violet">
                        ${this.app.icon('layer-group')}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Architecture</div>
                        <div class="s-row-sub">Single-directory native OverlayFS</div>
                    </div>
                    <span class="s-row-value">Direct (/data)</span>
                </div>
                <div class="s-row border-none">
                    <div class="s-row-icon icon-cyan">
                        ${this.app.icon('hdd')}
                    </div>
                    <div class="s-row-body">
                        <div class="s-row-label">Storage Usage</div>
                        <div class="s-row-sub">Used / Total (/data partition)</div>
                    </div>
                    <span class="s-row-value" id="settings-usage">${storageUsage}</span>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-green">
                        ${this.app.icon('terminal')}
                    </div>
                    <div class="s-plane-title">Engine Tools</div>
                </div>
                <div class="s-row-static border-none pb-4">
                    <div class="s-row-body">
                        <div class="s-row-label-desc">Verify Ring-0 stealth status or re-evaluate overlay mounts.</div>
                    </div>
                </div>
                <div class="s-actions pt-6">
                    <button class="s-btn primary full" id="verify-stealth">
                        ${this.app.icon('shield')} Verify Stealth Status
                    </button>
                    <button class="s-btn full" id="remount-overlays">
                        ${this.app.icon('sync')} Remount Overlays
                    </button>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-yellow">
                        ${this.app.icon('file-text')}
                    </div>
                    <div class="s-plane-title">Log File</div>
                </div>
                <div class="path-box">
                    <span class="path-box-text">${CONFIG.LOG_FILE}</span>
                    <button class="path-copy" data-copy="${CONFIG.LOG_FILE}" title="Copy">
                        ${this.app.icon('copy')}
                    </button>
                </div>
                <div class="s-actions">
                    <button class="s-btn primary" id="view-logs">
                        ${this.app.icon('eye')} View
                    </button>
                    <button class="s-btn danger" id="clear-logs">
                        ${this.app.icon('trash')} Clear
                    </button>
                </div>
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-blue">
                        ${this.app.icon('folder')}
                    </div>
                    <div class="s-plane-title">Paths</div>
                </div>
                ${[
                    { label: 'Modules Directory', path: CONFIG.MODULES_DIR },
                    { label: 'Log File',          path: CONFIG.LOG_FILE },
                    { label: 'Engine Binary',     path: CONFIG.BINARY },
                ].map(item => `
                    <div class="s-row-static">
                        <div class="s-row-body">
                            <div class="s-row-sub mb-2">${item.label}</div>
                        </div>
                    </div>
                    <div class="path-box">
                        <span class="path-box-text">${item.path}</span>
                        <button class="path-copy" data-copy="${item.path}" title="Copy">
                            ${this.app.icon('copy')}
                        </button>
                    </div>
                `).join('')}
            </div>

            <div class="s-plane">
                <div class="s-plane-head">
                    <div class="s-plane-icon icon-red">
                        ${this.app.icon('trash')}
                    </div>
                    <div class="s-plane-title">Metamodule Management</div>
                </div>
                <div class="s-row-static border-none pb-4">
                    <div class="s-row-body">
                        <div class="s-row-label-desc">
                            ${removePending 
                                ? 'MyOverlayFS is scheduled for removal on next reboot.'
                                : 'Queue MyOverlayFS for removal on next reboot.'}
                        </div>
                    </div>
                </div>
                <div class="s-actions pt-6">
                    <button class="s-btn ${removePending ? 'primary' : 'danger'} full" id="uninstall-module">
                        ${this.app.icon(removePending ? 'undo' : 'trash')} ${removePending ? 'Cancel Removal' : 'Uninstall MyOverlayFS'}
                    </button>
                </div>
            </div>
        </div>
        `;
    }

    async getModuleId() {
        let moduleId = 'meta-myoverlayfs';
        try {
            const rawInfo = await this.app.utils.execCommand(`${CONFIG.BINARY} inspect -r 2>/dev/null`);
            if (rawInfo) {
                const parsedInfo = JSON.parse(rawInfo);
                if (parsedInfo.id) {
                    moduleId = parsedInfo.id;
                }
            }
        } catch (err) {}
        return moduleId;
    }

    async loadData() {
        try {
            const utils = this.app.utils;
            const [usage, stealth, moduleId] = await Promise.all([
                utils.getStorageUsage(),
                utils.getStealthInfo(),
                this.getModuleId()
            ]);

            const targetPath = `${CONFIG.MODULES_DIR}/${moduleId}/remove`;
            const removePending = await utils.execCommand(`[ -f "${targetPath}" ] && echo "1"`).then(() => true).catch(() => false);

            this.data = {
                stealth,
                storageUsage: `${usage.usedFormatted} / ${usage.totalFormatted} (${usage.percent}%)`,
                moduleId,
                removePending
            };
        } catch {
            this.data = {
                stealth: { enabled: false, version: 'N/A', variant: 'Standard' },
                storageUsage: 'Error',
                moduleId: 'meta-myoverlayfs',
                removePending: false
            };
        }
    }

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    bindEvents() {
        const root = document.getElementById('page-content');
        if (!root) return;

        root.addEventListener('click', async (e) => {
            const copyBtn = e.target.closest('.path-copy');
            if (copyBtn) {
                const text = copyBtn.getAttribute('data-copy');
                if (text) {
                    try {
                        await navigator.clipboard.writeText(text);
                        this.app.utils.showToast('Path copied to clipboard', 'success');
                    } catch {
                        this.app.utils.showToast('Failed to copy path', 'error');
                    }
                }
                return;
            }

            const uninstallBtn = e.target.closest('#uninstall-module');
            if (uninstallBtn) {
                await this.handleUninstallToggle();
                return;
            }

            const verifyBtn = e.target.closest('#verify-stealth');
            if (verifyBtn) {
                await this.verifyStealth();
                return;
            }

            const remountBtn = e.target.closest('#remount-overlays');
            if (remountBtn) {
                await this.remountOverlays(remountBtn);
                return;
            }

            const viewLogsBtn = e.target.closest('#view-logs');
            if (viewLogsBtn) {
                await this.viewLogs();
                return;
            }

            const clearLogsBtn = e.target.closest('#clear-logs');
            if (clearLogsBtn) {
                await this.clearLogs();
            }
        });
    }

    async handleUninstallToggle() {
        const targetPath = `${CONFIG.MODULES_DIR}/${this.data.moduleId}/remove`;
        if (this.data.removePending) {
            try {
                await this.app.utils.execCommand(`rm -f "${targetPath}"`);
                this.app.utils.showToast('Uninstallation canceled', 'info');
                await this.update();
            } catch (err) {
                this.app.utils.showToast(`Failed: ${err.message}`, 'error');
            }
        } else {
            const ok = await this.app.utils.confirmAction(
                'Uninstall MyOverlayFS',
                'Are you sure you want to uninstall MyOverlayFS? Overlay modifications will be disabled on next reboot.<br><br><strong>Reboot required</strong> to finalize.',
                'Uninstall'
            );

            if (!ok) return;

            try {
                await this.app.utils.execCommand(`touch "${targetPath}"`);
                this.app.utils.showToast(`MyOverlayFS queued for removal on reboot`, 'success');
                await this.update();
            } catch (err) {
                this.app.utils.showToast(`Failed: ${err.message}`, 'error');
            }
        }
    }

    async verifyStealth() {
        try {
            const out = await this.app.utils.execCommand(`${CONFIG.BINARY} stealth 2>&1 || echo "Command failed"`);
            await this.app.utils.showModal(
                'MYSUFS Stealth Status',
                `<div class="log-content-body"><pre>${this.escapeHTML(out)}</pre></div>`,
                [{ label: 'Close', class: 'primary', onClick: () => {} }]
            );
        } catch (err) {
            this.app.utils.showToast(`Check failed: ${err.message}`, 'error');
        }
    }

    async remountOverlays(btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = `${this.app.icon('spinner', 'fa-spin')} Remounting...`;
        btn.disabled = true;

        try {
            await this.app.utils.execCommand(`${CONFIG.BINARY} 2>&1`);
            this.app.utils.showToast('Overlays remounted successfully', 'success');
            await this.update();
        } catch (err) {
            this.app.utils.showToast(`Remount failed: ${err.message}`, 'error');
        } finally {
            btn.innerHTML = orig;
            btn.disabled = false;
        }
    }

    async viewLogs() {
        try {
            const logs = await this.app.utils.execCommand(`cat "${CONFIG.LOG_FILE}" 2>/dev/null || echo "No logs available"`);
            const formattedLogs = this.formatLogs(logs);

            this.app.utils.showModal(
                'System Logs',
                `
                <div class="log-viewer-modal">
                    <div class="log-controls">
                        <button class="s-btn" id="refresh-logs">${this.app.icon('sync')} Refresh</button>
                        <button class="s-btn" id="copy-logs">${this.app.icon('copy')} Copy</button>
                    </div>
                    <div class="log-content-body" id="log-body">
                        ${formattedLogs}
                    </div>
                </div>
                `,
                [{ label: 'Close', class: 'primary', onClick: () => {} }]
            );

            setTimeout(() => {
                const modal = document.querySelector('.modal');
                if (!modal) return;

                const refreshBtn = modal.querySelector('#refresh-logs');
                if (refreshBtn) {
                    refreshBtn.addEventListener('click', async () => {
                        const newLogs = await this.app.utils.execCommand(`cat "${CONFIG.LOG_FILE}" 2>/dev/null || echo "No logs available"`);
                        const body = modal.querySelector('#log-body');
                        if (body) body.innerHTML = this.formatLogs(newLogs);
                        this.app.utils.showToast('Logs refreshed', 'info');
                    });
                }

                const copyBtn = modal.querySelector('#copy-logs');
                if (copyBtn) {
                    copyBtn.addEventListener('click', async () => {
                        try {
                            await navigator.clipboard.writeText(logs);
                            this.app.utils.showToast('Logs copied to clipboard', 'success');
                        } catch {
                            this.app.utils.showToast('Failed to copy logs', 'error');
                        }
                    });
                }
            }, 50);
        } catch (err) {
            this.app.utils.showToast(`Failed to read logs: ${err.message}`, 'error');
        }
    }

    async clearLogs() {
        const ok = await this.app.utils.confirmAction(
            'Clear Logs',
            'Are you sure you want to truncate the system log file?',
            'Clear'
        );
        if (!ok) return;

        try {
            await this.app.utils.execCommand(`> "${CONFIG.LOG_FILE}"`);
            this.app.utils.showToast('Logs cleared', 'success');
        } catch (err) {
            this.app.utils.showToast(`Failed to clear logs: ${err.message}`, 'error');
        }
    }

    formatLogs(rawLogs) {
        if (!rawLogs.trim()) return '<div class="log-empty">No logs recorded yet.</div>';

        return rawLogs.split('\n').map(line => {
            if (!line.trim()) return '';
            let levelClass = 'log-info';
            if (line.includes('[ERROR') || line.includes('ERROR:')) levelClass = 'log-error';
            else if (line.includes('[WARN') || line.includes('WARN:')) levelClass = 'log-warn';
            else if (line.includes('[DEBUG') || line.includes('DEBUG:')) levelClass = 'log-debug';

            return `<div class="log-line ${levelClass}">${this.escapeHTML(line)}</div>`;
        }).join('');
    }

    async update() {
        const html = await this.render();
        const content = document.getElementById('page-content');
        if (content) content.innerHTML = html;
    }
}