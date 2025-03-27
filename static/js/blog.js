import { prepareATag,firstLoadBlog,firstLoadProfile,profilePage,blogPage } from "./manageContent.js"

let PAGE = 1
let QUANTITY = 1

const dateFormatter = new Intl.DateTimeFormat('pl',{
    year:'numeric',
    month:'numeric',
    day:'numeric'

})

export function createBlogView(){
        if(window.location.href.includes('post')){
        const id = window.location.href.split('/').at(-1)
        getPost(id)
    }else{
        PAGE=1
        getALLPosts()
    }
    getALLCategories()
    if(firstLoadBlog){
        document.querySelector('#blog_link').addEventListener('click',()=>{
            getALLPosts(1)
        })
    }
}

export async function getALLPosts(page = PAGE,category = '') {
    try{
        PAGE = page
        const req = await fetch(`/blog/api/posts?page=${page}&quantity=${QUANTITY}&category=${category}`)
        const data = await req.json()
        if(req.ok){
            const postsContainer = document.querySelector('.posts')
            const singlePost = document.querySelector('.single-post')
            singlePost.style.display = 'none'
            postsContainer.style.display = 'block';
            postsContainer.innerHTML = ''

            // console.log(data)
            data.posts.forEach(post => {
                const date = dateFormatter.format(new Date(post.createdAt))
                const a = document.createElement('a')
                a.href = `/blog/post/${post.id}`
                a.classList.add('post')
                a.innerHTML= `
                        <img src="${post.featuredImage}" alt="${post.title}" class="post__image">
                        <div class="post__description">
                            <div class="post__description-tags" id="nr${post.id}">
                            </div>
                            <div>
                                <p class="post__description-date">${date},</p>
                                <p class="post__description-author">${post.author}</p>
                            </div>
                        </div>
                        <h2>${post.title}</h2>
                        <p class="post__short-text">${
                            post.content.split(' ').slice(20) !== '' ?  post.content.split(' ').slice(0,19).join(' ')+'...': post.content.split(' ').slice(19).join(' ') }
                        </p>`
                postsContainer.insertAdjacentElement('beforeend',a)
                post.categories.forEach((cat)=>{
                    document.querySelector(`#nr${post.id}`).insertAdjacentHTML('beforeend',
                        `<p class="post__description-tag">${cat.name}</p>`)
                })
                prepareATag(a,2)
                a.addEventListener('click',function(){
                    getPost(post.id)
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
                getALLPosts(PAGE,category)
            })
            btnPrev.addEventListener('click',()=>{
                getALLPosts(PAGE-2,category)
            })
            btnFirst.addEventListener('click',()=>{
                getALLPosts(1,category)
            })
            btnLast.addEventListener('click',()=>{
                getALLPosts(data.numberOfPages, category)
            })
            const paginationContainer = document.querySelector('.pagination')
            paginationContainer.insertAdjacentElement('beforeend',btnFirst)
            if(PAGE-1 !== 1 && PAGE-1 !== data.numberOfPages){
                btnCurrent.addEventListener('click',()=>{
                    getALLPosts(PAGE-1)
                })
                paginationContainer.insertAdjacentElement('beforeend',btnCurrent)
            }
            paginationContainer.insertAdjacentElement('beforeend',btnLast)

            // add only next btn
            if(data.firstOrLast !== 'first'){
                paginationContainer.insertAdjacentElement('afterbegin',btnPrev)
            }// add only prev btn
            if(data.firstOrLast !== 'last'){
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
            document.querySelector('.categories').innerHTML = '<h3>Categories</h3>'
            data.categories.forEach(category => {
                const a = document.createElement('a')
                a.href = `/blog?category=${category.name.toLowerCase()}`
                a.classList.add('category')
                a.textContent = category.name
                prepareATag(a)
                document.querySelector('.categories').insertAdjacentElement('beforeend',a)
                a.addEventListener('click',()=>{
                    getALLPosts(1,category.name.toLowerCase())
                })
            });

        }
    }catch(error){
        console.warn(error)
    }

}

async function getPost(id) {
    try{
        const req = await fetch(`/blog/api/posts/${id}`)
        const data = await req.json()
        if(req.ok){
            const postsContainer = document.querySelector('.posts')
            // console.log(data)
            const singlePost = document.querySelector('.single-post')
            singlePost.style.display = 'block'
            postsContainer.style.display = 'none';
            const post = data.post
            console.log(post)
            const markup = `
            <div class="single-post">
                <img src="${post.featuredImage}" alt="${post.title}" class="main">
                <h2 class="custom_underline">${post.title}</h2>
                <div class="text">
                    ${post.content}
                </div>
            </div>`
            singlePost.innerHTML = markup
        }
    }catch(error){
        console.warn(error)
    }
}