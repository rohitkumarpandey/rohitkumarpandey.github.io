const mediumUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@pandey-rohit";
const leetcodeUrl = "https://leetcode-stats-api.herokuapp.com/rohitpandey96";

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

function callAPI(url) {
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
        const blogs = []; // Initialize blogs as an empty array
        if (data && data.items) {
            data.items.forEach(item => {
                blogs.push({
                    title: item.title,
                    pubDate: formatDate(item.pubDate),
                    link: item.link
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
            <span>${blog.pubDate}</span>
        </div>
        <div>
            <a href="${blog.link}" target="_blank" class="sm-pills">Read More</a>
        </div>`;
    return blogElement;
}
function renderBlogs() {
    const blogContainer = document.getElementById("blogs-container");
    blogContainer.innerHTML = "<p>Loading blogs...</p>";
    loadBlogs().then(blogs => {
        if (blogs.length === 0) {
            blogContainer.innerHTML = "<p>No blog available :(</p>";
            return;
        }

        // Clear the loading message
        blogContainer.innerHTML = "";

        // Render each blog
        blogs.forEach(blog => {
            blogContainer.appendChild(createBlogElement(blog));
        });
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

function sectionInViewCallback(entry, observer) {
    if (entry.isIntersecting) {
        const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (activeLink) {
            const image = activeLink.querySelector("img");
            if (image) {
                const navigationLinks = document.querySelectorAll("nav a");
                navigationLinks.forEach(link => {
                    const image = link.querySelector("img");
                    if (image) {
                        image.classList.remove("active");
                    }
                });
                image.classList.add("active");
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
function sectionInView() {
    const sections = document.querySelectorAll("body > section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    };
    observeIntersection(sections, sectionInViewCallback, observerOptions);
}
document.addEventListener("DOMContentLoaded", function () {
    //renderBlogs();
    loadLeetCodeStats().then(stats => {
    }
    );
    sectionInView();

});