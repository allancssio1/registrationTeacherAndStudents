const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage 

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == 2|| currentPage +1 == totalPages || currentPage == totalPages
    const pagesAfterSelectedPAge = currentPage <= selectedPage + 1
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 1
    if (firstAndLastPage || pagesAfterSelectedPAge && pagesBeforeSelectedPage){
      if (oldPage && currentPage - oldPage > 3) {
        pages.push(`...`)
      }
      if (oldPage && currentPage - oldPage == 3) {
        pages.push(oldPage + 1)
      }
      pages.push(currentPage)
      oldPage = currentPage
    }
  }
  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter
  const page = Number(pagination.dataset.page)
  const total = Number(pagination.dataset.total)
  const pages = paginate(page, total)
  let element = ''
  for (let page of pages) {
    if (String(page).includes('...')) {
      element += `<span>${page}</span>`
    } else {
      if (filter){
        element += `<a href="?page${page}&filter=${filter}">${page}</a>`
      } else {
        element += `<a href="?page${page}">${page}</a>`
      }
    }
  }
  pagination.innerHTML = element
  
}
const pagination = document.querySelector('.pagination')
if (pagination) {
  createPagination(pagination)
}