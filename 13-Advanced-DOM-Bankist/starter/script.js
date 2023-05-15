'use strict';

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const allSections = document.querySelectorAll('.section');
const sec = document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const imgTargets = document.querySelectorAll('img[data-src]');
const dotContainer = document.querySelector('.dots');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // console.log(e.currentTarget);
  // const link = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link')) {
    const link = document.querySelector(e.target.getAttribute('href'));
    link.scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  const allTabs = e.currentTarget.children;
  const activeContent = e.target.getAttribute('data-tab');
  // console.log(activeContent);
  // console.log(clicked.dataset.tab);
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach(function (el) {
    el.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  // Activate tabs
  clicked.classList.add('operations__tab--active');
  // Activate contents
  document
    .querySelector(`.operations__content--${activeContent}`)
    .classList.add('operations__content--active');
});

// Menu fade animations
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Create sticky Navbar the right way using new IntersectionObserver API
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images

const revealImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0.15,
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
let curSlide = 0;
const maxSlide = slides.length - 1;

// Create dots function
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// Create active dots function
const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// Speads slides function
const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide function
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
};

// Previous slide function
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  gotoSlide(0);
  activateDot(0);
  createDots();
};
init();

// slider.style.overflow = 'visible';
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Keydown to slide
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

// Dots to slide
document.querySelector('.dots').addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // const slide = e.target.dataset.slide;
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
});

/////////////////////////////////////////////////////////////////////
/*
// Slider
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length - 1;
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// gotoSlide();

slider.style.overflow = 'visible';

const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
gotoSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);

gotoSlide(curSlide);

btnLeft.addEventListener('click', prevSlide);
&/
/////////////////////////////////////////////////////////////////
// let curSlide = 0;
// const maxSlide = slides.length - 1;
// console.log(maxSlide);

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

// slider.style.overflow = 'visible';

// // Go to next slide
// btnRight.addEventListener('click', function () {
//   if (curSlide === maxSlide) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
//   );
// });

// const imgTargets = document.querySelectorAll('img[data-src]');
// // console.log(imgTargets);

// const revealImage = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) return;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };
// const imgObserver = new IntersectionObserver(revealImage, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (!entry.isIntersecting) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(header);

// Create sticky on Navbar - The old way
/*
const intialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  console.log(intialCoords.top);
  console.log(window.scrollY);
  if (window.scrollY > intialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// nav.classList.add('sticky');

/*
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      console.log(this);
      if (el !== link) el.style.opacity = this;
    });
    // siblings.forEach(function (el) {
    //   console.log(this);
    //   if (el !== link) el.style.opacity = this;
    // });

    logo.style.opacity = this;
  }
};

// Menu fades
nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// Menu unfades
nav.addEventListener('mouseout', handleHover.bind(1));
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

/*

// const h1 = document.querySelector('h1');

// console.log(h1);
// // console.log(h1.children);
// // console.log(h1.childNodes);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

// h1.firstElementChild.style.color = 'white';

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header'));
// console.log(h1.closest('body'));
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);
// console.log([...h1.parentElement.children]);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(2)';
// });

// h1.lastElementChild.style.color = 'orangered';

// Creating event handler to each link
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    console.log(el.getAttribute('href'));
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
*/
// Page navigation

// // Create a random color
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log('links');
//   this.style.backgroundColor = randomColor();
//   console.log('links', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   // this.style.color = randomColor();
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target, e.currentTarget);
// });

// const h1 = document.querySelector('h1');
// console.log(h1);

// const alertH1 = function (e) {
//   alert("Hello it's h1");
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// console.log(sec);
// console.log(allButtons);

//message <button class="btn btn--close-cookie">Got it!

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'hi';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// message.style.width = '120%';

// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).width);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 100 + 'px';

// const logo = document.querySelector('.nav__logo');

// logo.alt = 'Minimals';

// logo.setAttribute('designer', 'hi');
// logo.setAttribute('comany', 'bankist');
// console.log(logo);

// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// const tLink = document.querySelector('.twitter-link');

// console.log(tLink.getAttribute('href'));
// console.log(logo.dataset.versionNumber);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

/*
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scroll on "Learn more"

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  // console.log(id, e.target);
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clauses
  if (!clicked) return;

  // Activate tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  const tabsContent = clicked.dataset.tab;
  document
    .querySelector(`.operations__content--${tabsContent}`)
    .classList.add('operations__content--active');
});

// Function for hadlehover
const handleover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// Create handlehover
nav.addEventListener('mouseover', handleover.bind(0.5));

nav.addEventListener('mouseout', handleover.bind(1));

const sticky = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const allSections = document.querySelectorAll('.section');

const headerObserver = new IntersectionObserver(sticky, headerOptions);

headerObserver.observe(header);

//Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // Make it stop observe
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
// imgTargets, imgObserver, loadImg

const imgTargets = document.querySelectorAll('img[data-src');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  // Make it stop observe
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
/*

// const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

// const sticky = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };

// const obsOptions = {
//   root: null,
//   threshold: 0,
// };

// const headerObserver = new IntersectionObserver(sticky, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(header);

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// const intialCoords = section1.getBoundingClientRect();
// console.log(intialCoords);

// //Sticky navigation
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > intialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = this;
//       }
//       logo.style.opacity = this;
//     });
//   }
// };

// nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', handleHover.bind(1));

// const intialCoords = section1.getBoundingClientRect();
// console.log(intialCoords);

// //Sticky navigation
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > intialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
//   // console.log(clicked);
//   // Guard clause
//   if (!clicked) return;
//   // Active tabs
//   // console.log(clicked.dataset.tab);
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   clicked.classList.add('operations__tab--active');
//   // Activate content area
//   tabsContent.forEach(t => t.classList.remove('operations__content--active'));
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

/*
----------BAD PRACTICE----------------
tabs.forEach(el =>
  el.addEventListener('click', function () {
    console.log('click');
  })
);
/*
///////////////////////////////
////////////////////////////////
////////////////////////////////
// LECTURES////////////////////
// HTML collection is not an array but still iterable
// [...] spread to an Array.

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// console.log(h1.parentElement);
// console.log(h1.parentNode);
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);
// h1.lastElementChild.style.color = 'purple';
// h1.firstElementChild.style.color = 'orangered';
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Transform h1's sibling elements to scale(0.5)
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   const id = e.target.getAttribute('href');
//   console.log(this, e.target);

//   if (e.target.classList.contains('nav__link')) {
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// e.currentTarget === this (pointing where addEventListen is attached to )
// e.target === where addEventListener happened

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     // const ids = this.href;
//     // console.log(ids);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//////////////////Lecture////////////
/*
// console.log(document.querySelectorAll('.secion'));
// console.log(document.getElementsByClassName('nav__link'));

// div 만들었다
const message = document.createElement('div');
// 만든 div에 클라스를 집어넣다
message.classList.add('cookie-message');
// 그 div에 메시지를 넣다
// message.textContent =
//   'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics.<button class="btn btn--close--cookie">Got it!</button>';

header.prepend(message);

// header.prepend(message.cloneNode(true));

// header.append(message.cloneNode(true));
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// message.style.height = '150px';
// console.log(message.style.width);
// console.log(getComputedStyle(message).height);
const cookieHeight =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
message.style.height = cookieHeight;
// console.log(cookieHeight);

// document.documentElement.style.setProperty('--color-primary', 'orangered');
// console.log(document.documentElement.style);

// const logo = document.querySelector('.nav__logo');
// logo.alt = 'Beautiful Minimalist Logo';
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.getAttribute('designer'));

// logo.setAttribute('company', 'Kancan');
// console.log(logo.getAttribute('src'));

// const twitLink = document.querySelector('.twitter-link');
// console.log(twitLink.getAttribute('href'));
// console.log(twitLink.href);
// console.log(logo.dataset.versionNumber);
// logo.classList.add('namesT');
// console.log(logo.classList.contains('namesT'));

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);

  // console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // );
  // window.scrollTo(s1cords.left, s1cords.top + );
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // Make a scroll smooth
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function () {
//   alert('You are hoving h1');
// });

const alerth1 = function () {
  alert('You are hoving h1');

  // h1.removeEventListener('mouseenter', alerth1);
};

// h1.addEventListener('mouseenter', alerth1);
// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) - min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', this, e.target, e.currentTarget);

  // Stop prepagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', this, e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', this, e.target, e.currentTarget);
});

// document.querySelector('.nav').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor;
//   console.log(this);
// });
*/
