window.addEventListener('DOMContentLoaded', (event) => {




    let sidebarItms = document.querySelectorAll('.sidebar_menu_item');
    for (const item of sidebarItms) {
        item.addEventListener('click' , ()=>{
            for (const i of sidebarItms) {
                i.classList.remove('active')
            }
            item.classList.add('active')
            let sectionId = item.getAttribute('data-section-id');
            let allSections = document.querySelectorAll('.main_section');
            for (const section of allSections) {
                section.classList.add('d-none')
            }
            document.getElementById(`${sectionId}`).classList.remove('d-none')
        })
    }

    // chart-------------->>
  


    
});

var tooltipEl = document.querySelectorAll('.has_tooltip')
for (const item of tooltipEl) {
    new bootstrap.Tooltip(item, {
        boundary: document.body
    })
}
