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

    const element        = document.querySelector('div.project0' + index);

    const tlOut = gsap.timeline();
    tlOut.to(element, {
      duration: 0.7,
      x: 250,
      autoAlpha: 0
    })

    return tlOut;

  }

  // Timeline transition for in and out animation
  const transition = (index) => {

    const goToIndex = index < totalSlides ? index+1 : 1;
    const tlTransition = gsap.timeline({
      onStart: function() {
        // console.log({index}, {goToIndex});
        currentStep < totalSlides ? currentStep++ : currentStep = 1;
      }
    });

    const tlOut = createTimelineOut(index);
    const tlIn = createTimelineIn(goToIndex);

    tlTransition
      .add(tlOut)
      .add(tlIn);

    return tlTransition;
  }

  // Event listeners for the next button
  document.querySelector('button.next').addEventListener('click', function(e) {
    e.preventDefault();

    transition(currentStep);
  })

  createTimelineIn(currentStep);
  }


window.addEventListener('load', function(){
    init();
});
