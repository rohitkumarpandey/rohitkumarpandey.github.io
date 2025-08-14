const mediumUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@pandey-rohit";
const leetcodeUrl = "https://leetcode-stats-api.herokuapp.com/rohitpandey96";
const githubUrl = "https://api.github.com/users/rohitkumarpandey";
const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Root font size in pixels

const navigationLinks = document.querySelectorAll("nav a img");
const emailSubject = document.getElementById("title");
const emailBody = document.getElementById("message");
const emailButton = document.getElementById("send-email-btn");

const emailSubjectError = document.getElementById("title-error");
const emailBodyError = document.getElementById("message-error");
const statsContainer = document.getElementById("stats-container");

const airIndiaDuration = document.getElementsByClassName("air-india-work-duration");
const toggleModeButton = document.getElementById("light-dark-mode-btn");
const industrialExperience = document.getElementById("industrial-experience");

const skills = [
    { name: 'JavaScript', icon: './assets/js.svg' },
    { name: 'Typescript', icon: './assets/ts.svg' },
    { name: 'Angular', icon: './assets/angular.svg' },
    { name: 'HTML 5', icon: './assets/html.svg' },
    { name: 'CSS3', icon: './assets/css3.svg' },
    { name: 'Java', icon: './assets/java.svg' },
    { name: 'Spring Boot', icon: './assets/spring-boot.svg' },
    { name: 'Node.js', icon: './assets/nodejs.svg' },
    { name: 'React.js', icon: './assets/react.svg' },
    { name: 'Azure', icon: './assets/azure.svg' },
    { name: 'AWS', icon: './assets/aws.svg' },
    { name: 'PostgreSQL', icon: './assets/postgre.svg' },
    { name: 'MongoDB', icon: './assets/mongo.svg' },
    { name: 'MySQL', icon: './assets/mysql.svg' },
];

const stats = {
    medium: {
        totalBlogs: 0
    },
    leetCode: {
        totalSolved: 0,
        totalQuestions: 0,
        easySolved: 0,
        totalEasy: 0,
        mediumSolved: 0,
        totalMedium: 0,
        hardSolved: 0,
        totalHard: 0,
        acceptanceRate: 0,
        ranking: 0
    },
    github: {
        totalRepos: 0,
        totalFollowers: 0
    }
};

const statsView = {
    leetCode: {
        stats: stats.leetCode,
        name: "LeetCode",
        icon: "./assets/leetcode.svg",
        get text() {
            return `Easy: <b>${stats.leetCode.easySolved}</b>/${stats.leetCode.totalEasy}, Medium: <b>${stats.leetCode.mediumSolved}</b>/${stats.leetCode.totalMedium}, Hard: <b>${stats.leetCode.hardSolved}</b>/${stats.leetCode.totalHard}, Acceptance Rate: <b>${stats.leetCode.acceptanceRate}</b>%, Ranking: <b>${stats.leetCode.ranking}</b>`;
        },
    },
    github: {
        stats: stats.github,
        name: "GitHub",
        icon: "./assets/github.svg",
        get text() {
            return `Repos: <b>${stats.github.totalRepos}</b>, Followers: <b>${stats.github.totalFollowers}</b>`;
        }
    },
    medium: {
        stats: stats.medium,
        name: "Medium",
        icon: "./assets/medium.svg",
        get text() {
            return `<b>${stats.medium.totalBlogs}</b> blogs`
        }
    }
}
let blogs = [];

const logos = {
    medium: "./assets/medium.svg",
    leetCode: "./assets/leetcode.svg",
    github: "./assets/github.svg",
    linkedIn: "./assets/linkedin.svg",
}
function getYearAndMonth(startDate) {
    const start = new Date(startDate);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }
    return `${years > 0 ? `${years} yr${years > 1 ? 's' : ''} ` : ''}${months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : ''
        }`.trim();
}
function formatDate(dateString) {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., "Oct")
    const year = date.getFullYear();

    // Add ordinal suffix to the day
    const ordinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th"; // Covers 4th to 20th
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}

async function callAPI(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

async function loadBlogs() {
    try {
        const data = await callAPI(mediumUrl);
        const blogs = [];
        if (data && data.items) {
            data.items.forEach(item => {
                blogs.push({
                    title: item.title,
                    pubDate: formatDate(item.pubDate),
                    link: item.link,
                    platform: "medium"
                });
            });
        }
        return blogs;
    } catch (error) {
        console.error("Error loading blogs:", error);
        return [];
    }
}
async function loadLeetCodeStats() {
    try {
        const data = await callAPI(leetcodeUrl);
        return {
            totalSolved: data.totalSolved || 0,
            totalQuestions: data.totalQuestions || 0,
            easySolved: data.easySolved || 0,
            totalEasy: data.totalEasy || 0,
            mediumSolved: data.mediumSolved || 0,
            totalMedium: data.totalMedium || 0,
            hardSolved: data.hardSolved || 0,
            totalHard: data.totalHard || 0,
            acceptanceRate: data.acceptanceRate || 0,
            ranking: data.ranking || 0
        };
    } catch (error) {
        console.error("Error loading LeetCode stats:", error);
        return {
            totalSolved: 0,
            totalQuestions: 0,
            easySolved: 0,
            totalEasy: 0,
            mediumSolved: 0,
            totalMedium: 0,
            hardSolved: 0,
            totalHard: 0,
            acceptanceRate: 0,
            ranking: 0
        };
    }
}
function createBlogElement(blog) {
    const blogElement = document.createElement("div");
    blogElement.classList.add("blog");
    blogElement.innerHTML = `
        <div>
            <span>${blog.title}</span>
            <span>${blog.pubDate} <button class="sm-pills"><img src=${logos[blog.platform]}>${blog.platform}</button></span>
        </div>
        <div>
            <a href="${blog.link}" target="_blank" class="sm-pills">Read More</a>
        </div>`;
    return blogElement;
}
async function renderBlogs() {
    const blogContainer = document.getElementById("blogs-container");
    const blgs = blogs.length == 0 ? await loadBlogs() : blogs;
    if (blgs.length === 0) {
        blogContainer.innerHTML = "<p>No blog available :(</p>";
        return;
    }
    blogContainer.innerHTML = "";

    blgs.forEach((blog, index) => {
        setTimeout(() => {
            blogContainer.appendChild(createBlogElement(blog));
            blogContainer.lastChild.classList.add("fade-in");
        }, 200 * index);
    });
}
function renderSkills() {
    const skillsContainer = document.getElementById("skills-container");
    skills.forEach((skill, index) => {
        const skillElement = document.createElement("div");
        skillElement.classList.add("skill");
        skillElement.innerHTML = `
            <img src="${skill.icon}" alt="${skill.name}" />
            <h3>${skill.name}</h3>`;
        setTimeout(() => {
            skillsContainer.appendChild(skillElement);
            skillElement.classList.add("fade-in");
        }, index * 200);
    });
}

function observeIntersection(elements, observerCallback, observerOptions = {}) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            observerCallback(entry, observer);
        });
    }, observerOptions);


    elements.forEach(element => {
        observer.observe(element);
    });

}

async function loadGitHubStats() {
    try {
        const data = await callAPI(githubUrl);
        return {
            totalRepos: data.public_repos || 0,
            totalFollowers: data.followers || 0
        };
    } catch (error) {
        console.error("Error loading GitHub stats:", error);
        return {
            totalRepos: 0,
            totalFollowers: 0
        };
    }
}
async function loadStats() {
    const [leetCodeResult, githubResult, blogsResult] = await Promise.allSettled([
        loadLeetCodeStats(),
        loadGitHubStats(),
        loadBlogs()
    ]);

    // Handle LeetCode stats
    if (leetCodeResult.status === "fulfilled") {
        stats.leetCode = leetCodeResult.value;
    } else {
        console.error("Error loading LeetCode stats:", leetCodeResult.reason);
    }

    // Handle GitHub stats
    if (githubResult.status === "fulfilled") {
        stats.github = githubResult.value;
    } else {
        console.error("Error loading GitHub stats:", githubResult.reason);
    }

    // Handle Blogs
    if (blogsResult.status === "fulfilled") {
        blogs = blogsResult.value;
        stats.medium.totalBlogs = blogs.length;
    } else {
        console.error("Error loading blogs:", blogsResult.reason);
    }

    return stats;
}
function renderStats() {
    loadStats().then((_) => {
        statsContainer.innerHTML = "";
        Object.keys(statsView).forEach((key, index) => {
            setTimeout(() => {
                const stat = statsView[key];
                const statItem = document.createElement("div");
                statItem.classList.add("stat-item");
                statItem.innerHTML = `
                <span>
                    <img src="${stat.icon}" alt="${stat.name}">
                    ${stat.name}
                </span>
                <p>${stat.text}</p>`;
                statsContainer.appendChild(statItem);
                statItem.classList.add("fade-in");
            }
                , index * 200);
        });
    }).catch(error => {
        console.error("Error loading stats:", error);
    }
    );
}
async function sectionInViewCallback(entry, observer) {
    if (entry.isIntersecting) {
        const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (activeLink) {
            const image = activeLink.querySelector("img");
            if (image) {
                navigationLinks.forEach(img => img.classList.remove("active"));
                image.classList.add("active");
            }
        }

        if (entry.target.id === "skills") {
            const skillsContainer = document.getElementById("skills-container");
            if (skillsContainer && !skillsContainer.classList.contains("viewed")) {
                renderSkills();
                renderStats();
                skillsContainer.classList.add("viewed");
            }
        }
        if (entry.target.id === "blogs") {
            const blogContainer = document.getElementById("blogs-container");
            if (blogContainer && !blogContainer.classList.contains("viewed")) {
                renderBlogs();
                blogContainer.classList.add("viewed");
            }
        }

    }
}
function workSectionInViewCallback(entry, observer) {
    if (entry.isIntersecting) {
        if (entry.target.id === "infosys") {
            const epam = document.getElementById("epam");
            if (epam && !epam.classList.contains("viewed")) {
                epam.classList.add("viewed");
                epam.classList.add("slow-fade-in");
                epam.style.display = "flex";
            }
        }
        if (entry.target.id === "epam") {
            const airIndia = document.getElementById("air-india");
            if (airIndia && !airIndia.classList.contains("viewed")) {
                airIndia.classList.add("viewed");
                airIndia.classList.add("slow-fade-in");
                airIndia.style.display = "flex";
            }
        }

    }
}
function sectionInView(threshold = 0.30) {
    const sections = document.querySelectorAll("body > section");

    const observerOptions = {
        root: null,
        rootMargin: `${-10 * rootFontSize}px 0px 0px 0px`,
        threshold
    };
    observeIntersection(sections, sectionInViewCallback, observerOptions);
}
function workSectionInView(threshold = 1) {
    const workSections = document.querySelectorAll(".work-item");
    const observerOptions = {
        root: null,
        rootMargin: `${-28 * rootFontSize}px 0px 0px 0px`,
        threshold
    };
    observeIntersection(workSections, workSectionInViewCallback, observerOptions);
}
function sendEmail() {
    if (!emailSubject || !emailBody || !emailButton) {
        console.error("Email elements are missing.");
        return;
    }

    emailButton.addEventListener("click", function (event) {
        event.preventDefault();
        const subject = encodeURIComponent(emailSubject.value.trim());
        const body = encodeURIComponent(emailBody.value.trim());

        if (!subject || !body) {
            emailSubjectError.textContent = !subject ? "Please fill the purpose of the message." : "";
            emailBodyError.textContent = !body ? "Please fill the message." : "";
            return;
        }

        const mailtoLink = `mailto:rohitpandey1896@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    });
}

function loadTheme(onload = false) {
    const body = document.body;
    let currentMode;
    if (onload) {
        currentMode = StorageService.getItem("mode") || 'dark';
        body.classList.add(`${currentMode}-mode`);
        StorageService.setItem("mode", currentMode);
    } else {
        const isDarkMode = body.classList.contains("dark-mode");
        currentMode = isDarkMode ? "light" : "dark";
        body.classList.remove(isDarkMode ? "dark-mode" : "light-mode");
        body.classList.add(`${currentMode}-mode`);
        body.classList.add('all-transitions');
        StorageService.setItem("mode", currentMode);
    }
}

function toggleTheme() {
    loadTheme(false);
}

class StorageService {
    static storage = localStorage;
    static getItem(key) {
        return this.storage.getItem(key);
    }
    static setItem(key, value) {
        this.storage.setItem(key, value);
    }
    static removeItem(key) {
        this.storage.removeItem(key);
    }
    static clear() {
        this.storage.clear();
    }
}

function getIndustrialExperience() {
    const startDate = '2019-09-09';
    industrialExperience.textContent = getYearAndMonth(startDate);
}
document.addEventListener("DOMContentLoaded", async function () {
    loadTheme(true);
    toggleModeButton.addEventListener("click", toggleTheme);
    if (airIndiaDuration) {
        const duration = getYearAndMonth("2023-07-05");
        Array.from(airIndiaDuration).forEach(element => {
            element.textContent = `(${duration})`;
        });
    }
    sectionInView();
    workSectionInView();
    getIndustrialExperience();
    sendEmail();
});