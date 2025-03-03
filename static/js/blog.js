let PAGE = 1
let QUANTITY = 2

const dateFormatter = new Intl.DateTimeFormat('pl',{
    year:'numeric',
    month:'numeric',
    day:'numeric'

})

export function createBlogView(){
    getALLPosts()
    getALLCategories()
}

export async function getALLPosts(page = PAGE) {
    try{
        PAGE = page
        const req = await fetch(`/blog/api/posts?page=${page}&quantity=${QUANTITY}`)
        const data = await req.json()
        if(req.ok){
            console.log(data)
            data.posts.forEach(post => {
                const date = dateFormatter.format(new Date(post.createdAt))
                const markup = `
                <div class="post">
                    <img src="${post.featuredImage}" alt="${post.title}" class="post__image">
                    <div class="post__description">
                        <div class="post__description-tags" id="${post.id}">
                        </div>
                        <div>
                            <p class="post__description-date">${date},</p>
                            <p class="post__description-author">${post.author}</p>
                        </div>
                    </div>
                    <h2>${post.title}</h2>
                    <p class="post__short-text">${
                        post.content.split(' ').slice(20) !== '' ?  post.content.split(' ').slice(0,19).join(' ')+'...': post.content.split(' ').slice(19).join(' ') }</p>
                </div>
                `
                document.querySelector('.posts').insertAdjacentHTML('beforeend',markup)
                post.categories.forEach((cat)=>{
                    document.querySelector(`#${post.id}`).insertAdjacentHTML('beforeend',
                        `<p class="post__description-tag">${cat.name}</p>`)
                })
            }
        )
        if(data.otherPages){
            document.querySelector('.posts').insertAdjacentHTML('beforeend','<div class="pagination"></div>')
            PAGE = PAGE+1
            const btnFirst = document.createElement('button')
            btnFirst.classList.add('pagination__btn')
            btnFirst.classList.add('num')
            btnFirst.textContent = 1
            const btnLast = document.createElement('button')
            btnLast.classList.add('pagination__btn')
            btnLast.classList.add('num')
            btnLast.textContent = data.numberOfPages
            const btnPrev = document.createElement('button')
            btnPrev.classList.add('pagination__btn')
            btnPrev.textContent = "before"
            const btnNext = document.createElement('button')
            btnNext.classList.add('pagination__btn')
            btnNext.textContent = 'Next'
            const btnCurrent = document.createElement('button')
            btnCurrent.classList.add('pagination__btn')
            btnCurrent.classList.add('num')
            btnCurrent.textContent = PAGE-1

            btnNext.addEventListener('click',()=>{
                getALLPosts(PAGE)
            })
            btnPrev.addEventListener('click',()=>{
                getALLPosts(PAGE-2)
            })
            btnFirst.addEventListener('click',()=>{
                getALLPosts(1)
            })
            btnLast.addEventListener('click',()=>{
                getALLPosts(data.numberOfPages)
            })
            const paginationContainer = document.querySelector('.pagination')
            paginationContainer.insertAdjacentElement('beforeend',btnFirst)
            if(PAGE-1 !== 1 && PAGE-1 !== data.numberOfPages){
                btnCurrent.addEventListener('click',()=>{
                    getALLPosts(PAGE-1)
                })
                paginationContainer.insertAdjacentElement('beforeend','...'+ btnCurrent + '...')
            }
            paginationContainer.insertAdjacentElement('beforeend',btnLast)

            // add only next btn
            if(data.firstOtLast !== 'first'){

                paginationContainer.insertAdjacentElement('afterbegin',btnPrev)
            }// add only prev btn
            if(data.firstOtLast !== 'last'){
                paginationContainer.insertAdjacentElement('beforeend',btnNext)
                // const html
            }// else add two buttons to prev and next page

        }}
    }catch(error){
        console.warn(error)
    }

}

async function getALLCategories() {
    try{
        const req = await fetch(`/blog/api/categories?page=${PAGE}&quantity=${QUANTITY}`)
        const data = await req.json()
        if(req.ok){
            data.categories.forEach(category => {
                const markup = `
                <p class="category">
                    ${category.name}
                </p>
                `
                document.querySelector('.categories').insertAdjacentHTML('beforeend',markup)
            });

        }
    }catch(error){
        console.warn(error)
    }

}