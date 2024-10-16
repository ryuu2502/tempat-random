// html elements
const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const resultEl = document.getElementById('result');

// set automatic focus for textarea
textarea.focus();

// event listener for textarea
textarea.addEventListener('keyup', (e) => {
  // captures what we type into text area
  createTags(e.target.value)

  // if the key pressed is Enter, call randomSelect function, then clear the text area after 10ms
  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = ''
    }, 10)

    randomSelect();
  }
})

// function to capture textarea input 
function createTags(input) {
  // filter = can not be an empty string and also trim any white space
  const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

  // clear text area
  tagsEl.innerHTML = '';

  // loop through array to create html element for each tag
  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  })
}

// function for the random selection of the choice
function randomSelect() {
  // highlight 30 times before landing on a pick
  const times = 30;

  // every 100ms picks and highlights through a random tag
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()

    highlightTag(randomTag);
    // then unhighlights the tag
    setTimeout(() => {
      unHighlightTag(randomTag)
    }, 100)
  }, 100);

  // stops our randomSelect function
  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag()
      highlightTag(randomTag)

      // Display the selected choice to the result element
      resultEl.innerText = `Tempat terpilih: ${randomTag.innerText}`;
    }, 100)
  }, times * 100)
}

// takes all the tags and uses math random to select through the array length
function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

// adds the highligh class list as random tag picker works through array
function highlightTag(tag) {
  tag.classList.add('highlight')
}

// removes the highlight class list
function unHighlightTag(tag) {
  tag.classList.remove('highlight')
}