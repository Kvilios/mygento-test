var banner = document.getElementById('banner');
var about = document.getElementById('about');
var bannerHeader = banner.getElementsByClassName('header')[0];
var aboutHeader = about.getElementsByClassName('header')[0];
aboutHeader.getElementsByClassName('navigation')[0].classList.add('dark');
var aboutViewportOffset = about.getBoundingClientRect();
updateHeader();

window.onscroll = updateHeader;

function updateHeader() {
    if (window.scrollY * 2 < aboutViewportOffset.top) {
        bannerHeader.classList.remove('hidden');
        aboutHeader.classList.add('hidden');
    }
    else {
        bannerHeader.classList.add('hidden');
        aboutHeader.classList.remove('hidden');
    }
}