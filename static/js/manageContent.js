import { createProfilePage } from "./card.js";
import {createBlogView} from './blog.js'
// check the URL and display the correct page

export let firstLoadProfile = true
export let firstLoadBlog = true
export const profilePage = document.querySelector("#index_page")
export const blogPage = document.querySelector("#blog_page")

document.addEventListener('DOMContentLoaded',()=>{
    blogPage.style.display = 'none'
    profilePage.style.display = 'none'

    document.querySelectorAll('a').forEach(function(aTag){
        prepareATag(aTag)
    })
    if(window.location.href.includes('blog')){
        profilePage.style.display = 'none'
        blogPage.style.display = 'grid'
        createBlogView()
        firstLoadBlog = false
    }else{
        profilePage.style.display = 'block'
        blogPage.style.display = 'none'
        createProfilePage()
        firstLoadProfile = false
    }

    // Hamburger menu func

    const hamburger = document.querySelector('.hamburger')
    const nav = document.querySelector('nav')
    hamburger.addEventListener('click',()=>{
        hamburger.classList.toggle('hamburger__active')
        nav.classList.toggle('nav__active')
    })
})

window.addEventListener('popstate',()=>{

    if(window.location.href.includes('blog')){
        profilePage.style.display = 'none'
        blogPage.style.display = 'grid'
        createBlogView()
    }else{
        profilePage.style.display = 'block'
        blogPage.style.display = 'none'
        if(firstLoadProfile){
            createProfilePage()
        }
        firstLoadProfile = false
    }
})

/**
 * manage the history and display proper content
 *
 * @param {*} aTag
 */
export function prepareATag(aTag,page=1){
    aTag.addEventListener('click',function(e){
        e.preventDefault()
        history.pushState({page:aTag.innerHTML},'',this.href)
        // manage the page content
        if(this.href.includes('blog') && profilePage.style.display !== 'none' ){
            profilePage.style.display = 'none'
            blogPage.style.display = 'grid'
            if(firstLoadBlog){
                createBlogView()
                firstLoadBlog = false
            }
        }else if(!this.href.includes('blog') && profilePage.style.display === 'none'){
            profilePage.style.display = 'block'
            blogPage.style.display = 'none'
            if(firstLoadProfile){
                createProfilePage()
                firstLoadProfile = false
            }
        }

        // add the scroll effect
        document?.querySelector(`#${this.dataset.elemid}`) ?
        document.querySelector(`#${this.dataset.elemid}`).scrollIntoView() : document.querySelector(`header`).scrollIntoView()
    })
}