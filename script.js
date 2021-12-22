var data = {
    title: null,
    page_content: null,
    previousActiveLink: null,
}

const filesPath = {
    welcomePage: 'content/welcome_page.txt',
    aboutPage: 'content/about_page.txt',
    workPage: 'content/work_page.txt',

}

const linkIndex = {
    null: 0,
    homeLink : 0,
    aboutLink: 1,
    workLink: 2,
}

// load content on page laod
async function loadContent() {
    getActiveLink();
    
}



function getActiveLink(activeTab = null) {
    if(data.previousActiveLink) {
        document.getElementById(data.previousActiveLink).style.color = "white";
    }
    if (!activeTab) {
        const url = window.location.href;
        const section = url.split('#')[1];
        activeTab = section ? section : 'home';
    }
    displaySection(activeTab);
    
    activeTab += 'Link';
    readContentFromFile(linkIndex[activeTab]);

    data.previousActiveLink = activeTab;
    document.getElementById(activeTab).style.color = "orange";
}

function displaySection(activeTab){
    if(data.previousActiveLink){        
        const prevLink = data.previousActiveLink.substring(0, data.previousActiveLink.indexOf('Link'));
        document.getElementById(prevLink).style.display = 'none';
    }
    document.getElementById(activeTab).style.display = 'block';

}



async function readContentFromFile(index) {
    const file = fetchFilePath(index);
    await readTextFile(file).then((content) => {
        data.page_content = content;
    });
    setPageContent(index);
}

function setHomepageData(){
    const name = fetchString(data.page_content, '<name>', '</name>');
    const designation = fetchString(data.page_content, '<designation>', '</designation>');
    const headline = fetchString(data.page_content, '<headline>', '</headline>');
    writeData('id', 'name', name);
    writeData('id', 'designation', designation);    
    writeData('id', 'headline', headline);

}

function setAboutPageData(){
    const role = fetchString(data.page_content, '<role>', '</role>');
    const about = fetchString(data.page_content, '<about>', '</about>');
    writeData('id', 'role', role);    
    writeData('id', 'about_desc', about);

}

function setWorkPageData(){
    const work_intro = fetchString(data.page_content, '<work_intro>', '</work_intro>');
   writeData('id', 'work_intro', work_intro); 

}

function setPageContent(index){
    switch(index){
        case 0:
            setHomepageData();
            break;
        case 1:
            setAboutPageData();
            break;
        case 2:
            setWorkPageData();
            break;
    }

}


function fetchString(strng, startSplitter, endSplitter) {
    return strng.substring(
        strng.indexOf(startSplitter)
        + startSplitter.length,
        strng.lastIndexOf(endSplitter)
    );
}



function fetchFilePath(index) {
    switch (index) {
        case 0:
            return filesPath.welcomePage;
        case 1:
            return filesPath.aboutPage;
        case 2:
            return filesPath.workPage;
    }
}


function readTextFile(file) {
    return fetch(file)
        .then(response => response.text());
}

// write data to html
function writeData(selectorType, selector, content) {
    switch (selectorType) {
        case 'id':
            document.getElementById(selector).innerHTML = content;
            break;
        case 'class':
            document.getElementsByClassName(selector).innerHTML = content;
            break;
        case 'tag':
            document.getElementsByTagName(selector).innerHTML = content;
            break;


    }

}