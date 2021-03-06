'use strict';
{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };

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
    authorClassCount: 5,
    authorClassPrefix: 'author-size-',
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
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
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

    /* [NEW] create a new variable allTags with an empty object */

    let allTags = {};
    
    /* find all articles */

    const articles = document.querySelectorAll(opt.articleSelector);
    console.log(articles);
      
    /* START LOOP: for every article: */
    for(let article of articles){
      console.log(article);

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(opt.articleTagsSelector);{
        console.log(tagsWrapper);
      }

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');{
        console.log(articleTags);
      }

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');{
        console.log(articleTagsArray);
      }

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);

        /* generate HTML of the link */
        // const linkHTML = '<li><a href="#tag-' + '">' + tag + '</a></li>';
        const linkHTMLData = {id: 'tag-' + tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log(linkHTML);
        

        /* add generated code to html variable */
        html += linkHTML + ' ';

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      console.log('insert HTML');
      tagsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    // let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    
      /* [NEW] generate code of a link and add it to allTagsHTML */
      /* allTagsHTML += tag + ' (' + allTags[tag] + ') ';*/
      /*allTagsHTML += '<li><a href="#tag-'+ tag +'">'+ tag +'</a>(' + allTags[tag] + ')</li>';*/

      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      // allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    
    // tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  
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

  /* Tags Parameters - counting max and min */
  function calculateAuthorsParams(authors){
    const params = {
      min:99999,
      max:0
    };

    for(let author in authors){
      console.log(author + ' is used ' + authors[author] + ' times');
      if(authors[author] > params.max){
        params.max = authors[author];
      }
      if(authors[author] < params.min){
        params.min = authors[author];
      }
    }
    console.log(authors);
    return params;
  }

  function calculateAuthorClass(count, params){
    const classNumber = Math.floor( ( ( count - params.min ) / ( params.max - params.min ) ) * opt.authorClassCount + 1);
    return opt.authorClassPrefix + classNumber;
  }

  //ex. 7.2  !!!!! Authors
  function generateAuthors(){

    /* [done] create a new variale allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){

      /* find authors wrapper */
      const authorsWrapper = article.querySelector(opt.articleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      console.log(articleAuthor);
    
      /* generate HTML of the link */
      //const linkHTML = html + 'by' + ' ' + '<a href="#author-'+ articleAuthor +'">'+ articleAuthor +'</a> ';
      const linkHTMLData = {id: 'author-' + articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      
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
      authorsWrapper.innerHTML = html;
  
      /* END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector('.authors.list');

    /* [NEW] add html from allAuthors to authorsList */
    //authorsList.innerHTML = allAuthors.join(' ');

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);

    /* [NEW] create variable for all links HTML code */
    //let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};
    

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let articleAuthor in allAuthors){
    /* [NEW] generate code of a link and add it to allTagsHTML */
      //const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthor], authorsParams) + '" href="#author-'+ articleAuthor +'">'+ articleAuthor + '</a> (' + allAuthors[articleAuthor] + ') </li>';
      //console.log('authorLinkHTML:', authorLinkHTML);
    
      //allAuthorsHTML += authorLinkHTML;
      allAuthorsData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor],
        className: calculateAuthorClass(allAuthors[articleAuthor], authorsParams)
      });
      
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    //authorsList.innerHTML = allAuthorsHTML;
    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
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