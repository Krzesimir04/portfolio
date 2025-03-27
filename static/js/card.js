const data = {
    labels: [
      'Backend',
      'Design',
      'Python',
      'JavaScript',
      'SQL',
      'Frontend'
    ],
    datasets: [{

      data: [50, 50, 50, 50, 50, 50],
      fill: true,
      // tension:0.3,
      backgroundColor: '#48b5f4',
      borderColor: '#0D9EF2',
    }]
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 5
        }
      },
      plugins:{

        legend:{
          display: false,
        },tooltip:{
          enabled:false,
        }
      },
      scales:{
        r: {
          min:0,
          max:100,
            angleLines: {
                display: false,
                lineWidth:3,
                borderDash:[10]
            },
            grid:{
              display:true,
              lineWidth:30
            },
            ticks:{display:false,
              showLabelBackdrop:false,
            },
            pointLabels:{display:false},
            suggestedMin: 50,
            suggestedMax: 100,
            pointLabels:{
              color: 'black',
              font:{
                size:25,
                lineHeight:4,
                family:'didact gothic',
                weight: 600
              }
            },
        },
      }
    },
  };

// const el = document.querySelector('#chart');
// el.classList.add('hidden')
// Chart.defaults.font.size = 30
// // new Chart(el,config)

// document.addEventListener('scroll', ()=>{
//   el.classList.remove('hidden')
//   el.classList.add('visible_anim')
// })
export function createProfilePage(){
  animationWriting('others', 'you', '.text_animation_testimonials')
  getAllTestimonials()
  getAllSkills()
  getAllProjects()
}
document.addEventListener('DOMContentLoaded',()=>{
})

// animation - writing
/**
 * Function takes the element by selector and toggles its content between oldText and newText in the time (wait param) using setInterval
 * To animate cursor use CSS on your own.
 *
 * @param {string} oldText
 * @param {string} newText
 * @param {number} [wait=300]
 * @param {string} elementQuerySelector
 */
function animationWriting(oldText,newText, elementQuerySelector, wait = 300){
const element = document.querySelector(elementQuerySelector)
let oldA = oldText.split("")
let newA = newText.split("")
let oldA1 = oldText.split("")
let newA1 = newText.split("")
setInterval(()=>{
  if(oldA.length !== 0){
    oldA.pop()
    element.textContent = oldA.join('')
  }
  else if(oldA.length === 0 && newA.length !== 0){
    element.textContent += newA.shift()
  }
  else{
    if(newA1.length !== 0){
      newA1.pop()
      element.textContent = newA1.join('')
    }
    else if(newA1.length === 0 && oldA1.length !== 0){
      element.textContent += oldA1.shift()
    }else if(oldA1.length === 0){
      oldA = oldText.split("")
      oldA1 = oldText.split("")
      newA =  newText.split("")
      newA1 = newText.split("")
    }
  }
},wait)}

// API calls

/**
 * Get all testimonials
 *
 */
async function getAllTestimonials() {
  try{
    const req = await fetch('/api/testimonials')
    const data = await req.json()
    if (req.ok){
      data.testimonials.forEach(testimonial => {
        const markup = `
              <div class="testimonial">
                <div class="blue-border">
                <img src="${testimonial.image}" alt="${testimonial.clientName} photo" class="testimonial__photo">
                </div>
                <p class="testimonial__full_name">${testimonial.clientName} </p>
                <p class="testimonial__company">${testimonial.company} </p>
                <p class="testimonial__text">${testimonial.shortText}</p>
                <a href="${testimonial.file}" class="testimonial__btn btn">full reference</a>
              </div>
        `
        document.querySelector('.testimonials').insertAdjacentHTML('beforeend',markup)
      });
    }else{
      throw new Error('something wrong happened.')
    }
  }catch(error){
    console.warn(error)
    const markup = `
    <div class="testimonial">
      <p class="testimonial__text">${error}</p>
    </div>
`
    document.querySelector('.testimonials').insertAdjacentHTML('beforeend',markup)
  }
}


/**
 * Get all skills
 *
 */
async function getAllSkills() {
  try{
    const req = await fetch('/api/skills')
    const data = await req.json()
    if (req.ok){
      data.skills.forEach(skill => {
        const markup = `
              <p class="skill">
                ${skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                <img src="${skill.icon}">
                </p>`
        document.querySelector('.skills').insertAdjacentHTML('beforeend',markup)
      });
    }else{
      throw new Error('something wrong happened.')
    }
  }catch(error){
    console.warn(error)
    const markup = `
      <p class="skill">${error}</p>
`
    document.querySelector('.skills').insertAdjacentHTML('beforeend',markup)
  }
}


/**
 * Get all projects
 *
 */
async function getAllProjects() {
  try{
    const req = await fetch('/api/projects')
    const data = await req.json()
    if (req.ok){
      data.projects.forEach((project,i) => {
        const modal = document.createElement('dialog')
        modal.innerHTML=`
        <img src="${project.image}" alt="${project.title}">
        <h2>${project.title}</h2>
        <div class="header">
            <div class="links">
                <a href="${project.liveDemo}">${project.liveDemo.slice(7)}</a>
                ${project.githubLink ? `<a href="${project.githubLink}"><svg class="social_icon" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M256 32C132.3 32 32 134.8 32 261.7C32 363.2 96.2 449.2 185.2 479.6C196.4 481.7 200.5 474.6 200.5 468.5C200.5 463 200.3 448.6 200.2 429.4C137.9 443.3 124.7 398.6 124.7 398.6C114.5 372.1 99.8 365 99.8 365C79.5 350.7 101.3 351 101.3 351C123.8 352.6 135.6 374.7 135.6 374.7C155.6 409.8 188 399.7 200.8 393.8C202.8 379 208.6 368.8 215 363.1C165.3 357.3 113 337.6 113 249.6C113 224.5 121.7 204 136 188C133.7 182.2 126 158.8 138.2 127.2C138.2 127.2 157 121 199.8 150.7C217.7 145.6 236.8 143.1 255.9 143C274.9 143.1 294.1 145.6 312 150.7C354.8 121 373.5 127.2 373.5 127.2C385.7 158.8 378 182.2 375.7 188C390 204.1 398.7 224.6 398.7 249.6C398.7 337.8 346.3 357.2 296.4 362.9C304.4 370 311.6 384 311.6 405.4C311.6 436.1 311.3 460.9 311.3 468.4C311.3 474.5 315.3 481.7 326.7 479.4C415.9 449.1 480 363.1 480 261.7C480 134.8 379.7 32 256 32Z" fill="black"/>
                    </svg></a>`:``}

            </div>
            <div class="technologies">

            </div>
        </div>
        <p class="description">${project.description}</p>
        <button class="close"></button>
        `
        modal.addEventListener('click',(e)=>{
          const dialogDim = modal.getBoundingClientRect()
          if(e.clientX<dialogDim.left || e.clientX>dialogDim.right || e.clientY>dialogDim.bottom || e.clientY<dialogDim.top){
            modal.close()
          }
        })
        const div = document.createElement('div')
        div.classList.add('project')
        div.addEventListener('click',()=>{
          modal.showModal()
        })
        div.innerHTML = `
            <img src="${project.image}" alt="${project.title} site">
            <div class="project__description">
                <div class="project__description_company-data">
                    <p class="company-name">${project.title}</p>
                    <a href="${project.liveDemo}" class="company-website">${project.liveDemo.slice(7)}</a>
                </div>
                <div class="project__description_technologies" id="pr${i}">
                </div>`
                document.querySelector('.projects').insertAdjacentElement('beforeend',div)
                document.querySelector('.projects').insertAdjacentElement('beforeend',modal)
                project.technologies.forEach(tech=>{
          div.querySelector(`#pr${i}`).insertAdjacentHTML ('beforeend',`<img src="${tech}" alt="${tech}">`)});
          project.technologies.forEach(tech=>{
            modal.querySelector(`.technologies`).insertAdjacentHTML ('beforeend',`<img src="${tech}" alt="${tech}" class="modal_tech">`)});
          modal.querySelector(`.close`).addEventListener('click',()=>{
            modal.close()
          })
    })

    }else{
      throw new Error('something wrong happened.')
    }
  }catch(error){
    console.warn(error)
    const markup = `
      <p class="project">${error}</p>
`
    document.querySelector('.projects').insertAdjacentHTML('beforeend',markup)
  }
}