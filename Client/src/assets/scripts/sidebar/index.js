// import * as jQuery from 'jquery';
// jQuery(alert);
// export default (function () {
  // Sidebar links
  jQuery('.sidebar .sidebar-menu li a').on('click', function () {
    const jQuerythis = jQuery(this);

    if (jQuerythis.parent().hasClass('open')) {
      jQuerythis
        .parent()
        .children('.dropdown-menu')
        .slideUp(200, () => {
          jQuerythis.parent().removeClass('open');
        });
    } else {
      jQuerythis
        .parent()
        .parent()
        .children('li.open')
        .children('.dropdown-menu')
        .slideUp(200);

      jQuerythis
        .parent()
        .parent()
        .children('li.open')
        .children('a')
        .removeClass('open');

      jQuerythis
        .parent()
        .parent()
        .children('li.open')
        .removeClass('open');

      jQuerythis
        .parent()
        .children('.dropdown-menu')
        .slideDown(200, () => {
          jQuerythis.parent().addClass('open');
        });
    }
  });


  // Sidebar Activity Class
  const sidebarLinks = jQuery('.sidebar').find('.sidebar-link');

  sidebarLinks
    .each((index, el) => {
      jQuery(el).removeClass('active');
    })
    .filter(function () {
      const href = jQuery(this).attr('href');
      const pattern = href[0] === '/' ? href.substr(1) : href;
      return pattern === (window.location.pathname).substr(1);
    })
    .addClass('active');

  // ٍSidebar Toggle
  jQuery('.sidebar-toggle').on('click', e => {
    jQuery('.app').toggleClass('is-collapsed');
    e.preventDefault();
  });

  /**
   * Wait untill sidebar fully toggled (animated in/out)
   * then trigger window resize event in order to recalculate
   * masonry layout widths and gutters.
   */
  jQuery('#sidebar-toggle').click(e => {
    e.preventDefault();
    setTimeout(() => {
      window.dispatchEvent(window.EVENT);
    }, 300);
  });
// }());
