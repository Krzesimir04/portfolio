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

document.addEventListener('DOMContentLoaded',()=>{
  animationWriting('others', 'you', '.text_animation_testimonials')
  getAllTestimonials()
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

async function getAllTestimonials() {
  try{
    const req = await fetch('/api/testimonials')
    const data = await req.json()
    if (req.ok){
      console.log(data)
      data.testimonials.forEach(testimonial => {
        const markup = `
              <div class="testimonial">
                <img src="${testimonial.personsPhoto}" alt="${testimonial.fullName} photo">
                <p class="testimonials_full_name">${testimonial.fullName} </p>
                <p class="testimonials_text">${testimonial.shortText}</p>
                <a href="" class="testimonials_btn btn"></a>
              </div>
        `
        document.querySelector('.testimonials').insertAdjacentHTML('beforeend',markup)
      });
    }else{

    }
  }catch(error){
    console.warn(error)
  }
}