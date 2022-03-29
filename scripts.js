import collection from "./catenatedText.js"

const now = new Date();
const day = now.getDate();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

const fullDate = now.toLocaleString("en-us", options);
const monthName = now.toLocaleString("en-us", { month: "long" });

const prompts = collection[monthName.toLowerCase()] || collection.lorem;
const prompt = ["", ...prompts][0 || day];
const dateString = fullDate;

const today = document.querySelector("#today");
const h3 = document.querySelector("h3");
const ul = document.querySelector("ul");
const monthname = document.querySelector("#monthname");

const text = `
Prompt for ${dateString}
💀 <a href="https://www.etymonline.com/search?q=${prompt}" target=_blank>etymology</a>
💀 <a href="https://www.dictionary.com/browse/${prompt}" target=_blank>dictionary</a>
`;

today.innerHTML = `${text}`;
h3.innerHTML = prompt;
ul.innerHTML = list(prompts, day);
monthname.innerHTML = monthName;

function dictionary(word, i, tag = "span", classname = "yesterday") {
    const url = "https://www.dictionary.com/browse";
    return `<a href="${url}/${word}"
        class="${classname}"
        target=_blank>
            <${tag}>${i + 1}. ${word}</${tag}>
         </a>`;
}

function list(array, index) {
    console.log(array.length, index);
    return array
        .filter((s) => s)
        .map((row, i) => {
            const classname = i + 1 === index ? `today` : `tomorrow`;
            const text =
                i + 1 < index
                    ? dictionary(row, i, "del")
                    : dictionary(row, i, "span", classname);

            return `<li>${text}</li>`;
        })
        .join("\n");
}

