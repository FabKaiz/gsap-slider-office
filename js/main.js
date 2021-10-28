function init(){
  gsap.set('.projects', {autoAlpha: 1});
  gsap.set('.project', {x: '-100%'});

  let currentStep = 1;
  const totalSlides = document.querySelectorAll('.project').length;
  const wrapper = gsap.utils.wrap(0, totalSlides);

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

  const updateCurrentStep = (goToIndex) => {
    currentStep = goToIndex;

    // Set the active class to the correct dot
    document.querySelectorAll('.dot').forEach((element, index) => {
      element.setAttribute('class', 'dot');
      if (index === currentStep) {
        element.classList.add('active');
      }
    })

    positionDot();
  }

  // Timeline transition for direction, in and out animation
  const transition = (direction, toIndex) => {

    const tlTransition = gsap.timeline({
      onStart: function() {
        // console.log({fromIndex: currentStep}, {goToIndex});
        updateCurrentStep(toIndex);
      }
    });

    const tlOut = createTimelineOut(direction, currentStep);
    const tlIn = createTimelineIn(direction, toIndex);

    tlTransition
      .add(tlOut)
      .add(tlIn);

    return tlTransition;
  }

  const isTweening = () => {
    return gsap.isTweening('.project');
  }

  const createNavigation = () => {

    // add active spot
    const spot = document.createElement('div');
    spot.setAttribute('class', 'spot');

    // Crfeate a dot container
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'dots');

    // Create a dot for each slide
    for (let index = 0; index < totalSlides; index++) {
      const element = document.createElement('button');
      const text = document.createTextNode(index);
      element.appendChild(text);
      element.setAttribute('class', 'dot');
      
      if (currentStep === index) {
        element.classList.add('active');
      }

      element.addEventListener('click', () => {

        if (!isTweening() && currentStep !== index) {
          const direction = index > currentStep ? 'next' : 'prev';
          transition(direction, index);
        }
      })

      newDiv.appendChild(element)
    }

    // Add the dots to the project container
    newDiv.appendChild(spot);
    document.querySelector('.projects').appendChild(newDiv);
    positionDot();
  }

  const positionDot = () => {

    const activeDotX   = document.querySelector('.dot.active').offsetLeft;
    const spot         = document.querySelector('.spot');
    const spotX        = spot.offsetLeft;
    const destinationX = Math.round(activeDotX - spotX + 5);

    const dotTl = gsap.timeline();
    dotTl
      .to(spot, {
        duration: 0.5,
        x: destinationX,
        scale: 2.5,
        ease: 'power1.Out'
      })
      .to(
        spot, {
          duration: 0.2,
          scale: 1,
          ease: 'power1.in'
        }
      )
  }

  // =-=-=-= EVENT LISTENERS =-=-=-=-=-
  // Event listener for the next button
  document.querySelector('button.next').addEventListener('click', function(e) {
    e.preventDefault();

    const nextStep = wrapper(currentStep + 1);

    !isTweening() && transition('next', nextStep);
  })

  // Event listener for the previous buttonn
  document.querySelector('button.prev').addEventListener('click', function(e) {
    e.preventDefault();

    const previousStep = wrapper(currentStep - 1);

    !isTweening() && transition('prev', previousStep);
  })

  // =-=-=-= INIT FUNCTION =-=-=-=-=-
  createTimelineIn('next', currentStep); // init sliders
  createNavigation(); // init dots
}


window.addEventListener('load', function(){
    init();
});
