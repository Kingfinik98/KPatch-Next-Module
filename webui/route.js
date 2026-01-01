import * as patchModule from './page/patch.js';

const backBtn = document.getElementById('back-btn');

function setupExitBtn() {
    if (typeof window.ksu !== 'undefined' && typeof window.ksu.exit !== 'undefined') {
        backBtn.style.display = 'inline-flex';
        backBtn.onclick = () => ksu.exit();
    } else if (typeof window.webui !== 'undefined' && typeof window.webui.exit !== 'undefined') {
        backBtn.style.display = 'inline-flex';
        backBtn.onclick = () => webui.exit();
    } else {
        backBtn.style.display = 'none';
    }
}

function navigateToHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
    document.querySelector('.title').textContent = 'KPatch Next';
    document.getElementById('home-icon').style.display = 'flex';

    updateBottomBar('home');
    setupExitBtn();
}

function navigateToKPM() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('kpm-page').classList.add('active');
    document.querySelector('.title').textContent = 'KPModule';
    document.getElementById('home-icon').style.display = 'none';

    updateBottomBar('KPM');
    setupExitBtn();
}

function navigateToSettings() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('settings-page').classList.add('active');
    document.querySelector('.title').textContent = 'Settings';
    document.getElementById('home-icon').style.display = 'none';

    updateBottomBar('settings');
    setupExitBtn();
}

function navigateToPatch() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('patch-page').classList.add('active');
    document.querySelector('.title').textContent = 'Patch';
    document.getElementById('home-icon').style.display = 'none';
    document.querySelector('.trailing-btn').style.display = 'flex';
    document.getElementById('patch-terminal').innerHTML = '';
    document.getElementById('reboot-fab').classList.add('hide');
    document.querySelectorAll('.patch-only').forEach(p => p.classList.remove('hidden'));
    document.querySelectorAll('.unpatch-only').forEach(p => p.classList.add('hidden'));
    backBtn.style.display = 'inline-flex';
    backBtn.onclick = () => navigateToHome();

    patchModule.getKpimgInfo();
    patchModule.getKernelInfo();
}

function navigateToUnPatch() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('patch-page').classList.add('active');
    document.querySelector('.title').textContent = 'UnPatch';
    document.getElementById('home-icon').style.display = 'none';
    document.querySelector('.trailing-btn').style.display = 'flex';
    document.getElementById('patch-terminal').innerHTML = '';
    document.getElementById('patch-keyboard-inset').classList.remove('hide');
    document.getElementById('reboot-fab').classList.add('hide');
    document.querySelectorAll('.patch-only').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.unpatch-only').forEach(p => p.classList.remove('hidden'));
    backBtn.style.display = 'inline-flex';
    backBtn.onclick = () => navigateToHome();

    patchModule.getKernelInfo();
}

function updateBottomBar(activeId) {
    document.querySelectorAll('.bottom-bar-item').forEach(item => {
        if (item.id === activeId) {
            item.setAttribute('selected', '');
        } else {
            item.removeAttribute('selected');
        }
    });
}

export function setupRoute() {
    // patch button
    document.getElementById('patch-btn').onclick = () => navigateToPatch();

    // uninstall button
    document.getElementById('uninstall').onclick = () => navigateToUnPatch();

    // not installed card
    document.getElementById('not-installed').addEventListener('click', () => {
        navigateToPatch();
    });

    // Bottom bar
    document.querySelectorAll('.bottom-bar-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.id === 'home') {
                navigateToHome();
            } else if (item.id === 'KPM') {
                navigateToKPM();
            } else if (item.id === 'settings') {
                navigateToSettings();
            }
        });
    });

    // Init
    navigateToHome();
}
