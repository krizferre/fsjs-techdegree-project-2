function showPage(pageNumber, studentList) {
  // first hide all students on the page
  $('.student-item').hide();

  // Then loop through all students in our student list argument
  // if student should be on this page number
  // show the student
  const upperLimit = 10 * pageNumber;
  const lowerLimit = upperLimit - 10;
  for (let i = 0; i < studentList.length; i++) {
    if (i >= lowerLimit && i < upperLimit) {
      $('.student-item').eq(studentList[i]).show();
    }
  }
}

function appendPageLinks(studentList) {
  // remove the old page link section from the site
  $('.pagination').remove();

  // determine how many pages for this student list
  const pages = Math.ceil(studentList.length / 10);

  if (pages < 2) {
   return;
  }

  // create a page link section
  let pageLinkSection = '<div class="pagination"><ul>';
  // “for” every page
  for (let i = 0; i < pages; i++) {
    // add a page link to the page link section
    if (i === 0) {
      pageLinkSection += `<li><a href="#" class="active">${i+1}</a></li>`;
    } else {
      pageLinkSection += `<li><a href="#">${i+1}</a></li>`;
    }
  }
  pageLinkSection += '</ul></div>';

  // append our new page link section to the site
  $('.student-list').append(pageLinkSection);

  // define what happens when you click a link
  $('.pagination ul li a').on('click', (event) => {
    // Use the showPage function to display the page for the link clicked
    const pageNumber = parseInt($(event.target).text());
    showPage(pageNumber, studentList);
    // mark that link as “active”
    $('.pagination ul li a').removeClass('active');
    $(event.target).addClass('active');
  });
}

let studentList = [];
for (let i = 0; i < $('.student-item').length; i++) {
  studentList.push(i);
}

showPage(1, studentList);
appendPageLinks(studentList);

// search feature
const searchHtml = '<div class="student-search">' +
'<input placeholder="Search for students...">' +
'<button>Search</button></div>';
$('.page-header').append(searchHtml);

$('.student-search button').on('click', () => {
  studentList = [];
  const input = $('.student-search input').val();
  let found = false;
  let matches = 0;
  for (let i = 0; i < $('.student-item').length; i++) {
    const name = $('.student-item h3').eq(i).text();
    const email = $('.email').eq(i).text();

    if(name.indexOf(input) >= 0 || email.indexOf(input) >= 0) {
      studentList.push(i);
      found = true;
    }
  }

  showPage(1, studentList);
  appendPageLinks(studentList);

  $('.no-match').remove();
  if (!found) {
    $('.page-header').after('<div class="no-match">No matches found</div>');
  }
});
