'use strict';

// tabs
const tabBtns = document.querySelectorAll('.tab__btn');
const tabContent = document.querySelectorAll('.tab__content-item');

tabBtns.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');
    const currentImg = document.querySelector(`#${tabId}`);

    if (!tab.classList.contains('tab__btn_active')) {
      tabBtns.forEach((item) => {
        item.classList.remove('tab__btn_active');
      });

      tabContent.forEach((item) => {
        item.classList.remove('active');
      });

      tab.classList.add('tab__btn_active');
      currentImg.classList.add('active');
    }
  });
});

// scroll to top
const debounce = (func, msec) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...arg) => {
    const prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && lastCall - prevCall < msec) clearTimeout(lastCallTimer);

    lastCallTimer = setTimeout(() => func(...arg, 100));
  };
};

const createButton = () => {
  const button = document.createElement('button');
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;transform: ;msFilter:;"><path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path></svg>
  `;
  button.style.cssText = `
    position: fixed;
    z-index: 999;
    bottom: 130px;
    right: 16px;
    display: none;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: #0082f3;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(49, 33, 1, 0.15);
    border: 1px solid #0082f3;
    border-radius: 4px;
  `;

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return button;
};

const initScrollTopButton = () => {
  const btn = createButton();
  document.body.append(btn);

  const showElemScrollPosition = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    btn.style.display = scrollPosition > window.innerHeight / 2 ? 'flex' : 'none';
  };

  window.addEventListener('scroll', debounce(showElemScrollPosition, 100));
};

initScrollTopButton();
