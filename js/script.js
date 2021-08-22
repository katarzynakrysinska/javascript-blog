'use strict';
{
  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list',
  };
  
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');  
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function generateTitleLinks(customSelector = ''){

    console.log(customSelector);
    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';
  
    /* [DONE] for each article */
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    console.log(opt.articleSelector + customSelector);

    let html = '';

    for (let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      html = html + linkHTML;

      console.log(linkHTML); 
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  // Tags Parameters - counting max and min
  function calculateTagsParams(tags){

    const params = {max: 0, min: 9999};
    console.log(params);

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > params.max) {
        params.max = tags[tag];
      } 
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    } return params;
  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min,
      normalizedMax = params.max - params.min,
      percentage = normalizedCount / normalizedMax,
      classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1);

    return opt.cloudClassPrefix + classNumber;
  }

  // Tags 
  function generateTags(){

    /* [done] create a new variale allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){
  
      /* find tags wrapper */
      const tagsList = article.querySelector(opt.articleTagsSelector);
  
      /* make html variable with empty string */
      let html = '';
  
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      // console.log(articleTags);
  
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      //console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){

        //  console.log(tag);
        /* generate HTML of the link */
        //console.log(articleTagsArray);

        const linkHTML = '<a href="#tag-'+ tag +'">'+ tag +'</a> ';
        console.log(linkHTML);
  
        /* add generated code to html variable */

        html = html + linkHTML;

        /* [NEW] check if this link is Not already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
  
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
  
    /* END LOOP: for every article: */
    }

    // [DONE] find list of tags in right column
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [DONE] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [DONE] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [DONE] generate code of a link and add it to allTagsHTML */

      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-'+ tag +'">'+ tag + '</a> (' + allTags[tag] + ') </li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      //allTagsHTML += '<a href="#tag-'+ tag +'">'+ tag +'</a> ' + ' (' + allTags[tag] + ') ';
      allTagsHTML += tagLinkHTML;
    
    /* [DONE] END LOOP: for each tag in allTags: */
    }

    /*[DONE] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  
  generateTags();

  // Tag Click Thingy 
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  
    /* find all tag links with class active */
    const activeArticles = document.querySelectorAll('a.active[href^="#tag-"]');
  
    /* START LOOP: for each active tag link */
    for(let activeArticle of activeArticles){
  
      /* remove class active */
      activeArticle.classList.remove('active');

    /* END LOOP: for each active tag link */
    }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagsLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let tagLink of tagsLinks){
  
      /* add class active */
      tagLink.classList.add('active');
  
    /* END LOOP: for each found tag link */
    }
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  
    /* START LOOP: for each link */
    for(let link of allTagsLinks){
  
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
  
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  //ex. 7.2  !!!!! Authors

  function generateAuthors(){

    /* [done] create a new variale allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){

      /* find authors wrapper */
      const authorsList = article.querySelector(opt.articleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      console.log(articleAuthor);
    
      /* generate HTML of the link */
      const linkHTML = html + 'by' + ' ' + '<a href="#author-'+ articleAuthor +'">'+ articleAuthor +'</a> ';
      console.log(linkHTML);
  
      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[articleAuthor]){
        /* [NEW] add generated code to allTags array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
  
      /* insert HTML of all the links into the authors wrapper */
      authorsList.innerHTML = html;
  
      /* END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector('.authors');

    /* [NEW] add html from allAuthors to authorsList */
    //authorsList.innerHTML = allAuthors.join(' ');

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let articleAuthor in allAuthors){
    /* [NEW] generate code of a link and add it to allTagsHTML */
      allAuthorsHTML += '<a href="#author-'+ articleAuthor +'">'+ articleAuthor +'</a> ' + ' (' + allAuthors[articleAuthor] + ') ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    authorsList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  // ex. 7.2 !!! Authors Click Thingy

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
  
    /* find all authors links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  
    /* START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorLinks){
  
      /* remove class active */
      activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active author link */
    }
  
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks){
  
      /* add class active */
      authorLink.classList.add('active');
  
    /* END LOOP: for each found author link */
    }
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthors(){
    /* find all links to authors */
    const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
  
    /* START LOOP: for each link */
    for(let authorLink of allAuthorsLinks){
  
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
  
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();

}