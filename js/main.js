function init(){
  gsap.set('.projects', {autoAlpha: 1});
  gsap.set('.project', {x: '-100%'});

  let currentStep = 3;

  // Update de class of the body to set the background color
  const updateClass = (projectClass) => {
    document.querySelector('body').className = projectClass;
  }

  // Animation In
  const createTimelineIn = (index) => {
    const element        = document.querySelector('div.project0' + index),
          projectClasses = element.className.split(' '),
          projectClass   = projectClasses[1];

    const tlIn = gsap.timeline();
    tlIn.fromTo(element, {
      autoAlpha: 0,
      x: '-100%',
    }, {
      duration: 0.7, x: 0,autoAlpha: 1,
      onStart: updateClass,
      onStartParams: [projectClass]
    });

    return tlIn;
  }

  // Animation Out
  const createTimelineOut = (index) => {
    const tlOut = gsap.timeline();
    tlOut.to(element, {
      duration: 0.7,
      x: 250,
      autoAlpha: 0
    })

    return tlOut;

  }

  const transition = () => {
    // Timeline transition for in and out animation
    const tlTransition = gsap.timeline();
    tlTransition
      .add(tlIn)
      .add(tlOut)

    return tlTransition;
  }

  createTimelineIn(currentStep);
  }


window.addEventListener('load', function(){
    init();
});
