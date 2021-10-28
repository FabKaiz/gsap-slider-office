function init(){
  gsap.set('.projects', {autoAlpha: 1});
  gsap.set('.project', {x: '-100%'});

  let currentStep = 3;
  const totalSlides = document.querySelectorAll('.project').length;

  // Update de class of the body to set the background color
  const updateClass = (projectClass) => {
    document.querySelector('body').className = projectClass;
  }

  // Animation In
  const createTimelineIn = (direction, index) => {

    const goPrev = direction === 'prev';

    const element        = document.querySelector('div.project0' + index),
          projectClasses = element.className.split(' '),
          projectClass   = projectClasses[1],
          title          = element.querySelector('.project-title'),
          subtitle       = element.querySelector('.project-subtitle'),
          button         = element.querySelector('.button-container');

    const tlIn = gsap.timeline({ 
      defaults: {
        modifiers: {
          x: gsap.utils.unitize(function(x) {
            return goPrev ? Math.abs(x) : x;
          })
        }
      }
    });

    tlIn.fromTo(element, {
      autoAlpha: 0,
      x: '-100%',
    }, {
      duration: 0.7, x: 0,autoAlpha: 1,
      onStart: updateClass,
      onStartParams: [projectClass],

    })
    .from([title, subtitle, button], {
      duration: 0.8,
      x: -20,
      autoAlpha: 0,
      stagger: 0.6,

    });

    return tlIn;
  }

  // Animation Out
  const createTimelineOut = (direction, index) => {

    const goPrev = direction === 'prev';
    const element        = document.querySelector('div.project0' + index);

    const tlOut = gsap.timeline();
    tlOut.to(element, {
      duration: 0.7,
      x: 250,
      autoAlpha: 0,
      modifiers: {
        x: gsap.utils.unitize(function(x) {
          return goPrev ? -x : x;
        })
      },
      ease: "back.in(2)",
    })

    return tlOut;

  }

  // Set in wich direction the slider should move
  const getGoToIndex = (direction, index) => {

    let goToIndex = index;

    if (direction === 'next') {
      goToIndex = index < totalSlides ? index+1 : 1
    } else {
      goToIndex = index > 1 ? index-1 : totalSlides
    }

    return goToIndex;
  }

  const updateCurrentStep = (goToIndex) => {
    currentStep = goToIndex
  }

  // Timeline transition for direction, in and out animation
  const transition = (direction, index) => {

    const goToIndex = getGoToIndex(direction, index);
    const tlTransition = gsap.timeline({
      onStart: function() {
        // console.log({index}, {goToIndex});
        updateCurrentStep(goToIndex);
      }
    });

    const tlOut = createTimelineOut(direction, index);
    const tlIn = createTimelineIn(direction, goToIndex);

    tlTransition
      .add(tlOut)
      .add(tlIn);

    return tlTransition;
  }

  const isTweening = () => {
    return gsap.isTweening('.project');
  }

  // Event listener for the next button
  document.querySelector('button.next').addEventListener('click', function(e) {
    e.preventDefault();

    !isTweening() && transition('next', currentStep);
  })

  // Event listener for the previous buttonn
  document.querySelector('button.prev').addEventListener('click', function(e) {
    e.preventDefault();

    !isTweening() && transition('prev', currentStep);
  })

  createTimelineIn('next', currentStep);
  }


window.addEventListener('load', function(){
    init();
});
