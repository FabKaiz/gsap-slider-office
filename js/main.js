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

  const updateCurrentStep = (goToIndex) => {
    currentStep = goToIndex;

    // Set the active class to the correct dot
    document.querySelectorAll('.dot').forEach((element, index) => {
      element.setAttribute('class', 'dot');
      if (index+1 === currentStep) {
        element.classList.add('active');
      }
    })
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

    // Crfeate a dot container
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'dots');

    // Create a dot for each slide
    for (let index = 1; index < totalSlides+1; index++) {
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
    document.querySelector('.projects').appendChild(newDiv);
  }

  // Event listener for the next button
  document.querySelector('button.next').addEventListener('click', function(e) {
    e.preventDefault();

    const isLast = currentStep === totalSlides;
    const nextStep = isLast ? 1 : currentStep + 1;


    !isTweening() && transition('next', nextStep);
  })

  // Event listener for the previous buttonn
  document.querySelector('button.prev').addEventListener('click', function(e) {
    e.preventDefault();

    const isFirst = currentStep === 1;
    const previousStep = isFirst ? totalSlides : currentStep - 1;

    !isTweening() && transition('prev', previousStep);
  })
  // init sliders and dots
  createTimelineIn('next', currentStep);
  createNavigation();
}


window.addEventListener('load', function(){
    init();
});
