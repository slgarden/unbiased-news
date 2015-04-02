$(document).ready(function() {

  var jcarousel = $('.jcarousel').jcarousel();

  $('.jcarousel-control-prev')
      .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
      })
      .jcarouselControl({
          target: '-=1'
      });

  $('.jcarousel-control-next')
      .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
      })
      .jcarouselControl({
          target: '+=1'
      });

  $('.search_form').on('submit', function(event) {
    event.preventDefault();
    query = this.query.value
    category = this.category.value

    $.ajax({
      url: '/articles',
      type: 'POST',
      data: {
        query: query,
        category: category
      }
    }).done(function(data) {
      var $ul = $("<ul>")
      $('.search_form')[0].reset();
      $.each(data, function(index, object) {
        var article = data[index];
        $ul.append(
          buildArticle(article.Title, article.Source, article.Description, article.Url, index));
      })
      jcarousel.html($ul);

            // Reload carousel
      jcarousel.jcarousel('reload')
    });

  })

  function buildArticle(articleTitle, articleSource, articleDescription, articleUrl, index) {

    var articleTemplate = $.trim($('.article_template').html());
    var $article = $(articleTemplate);

    $article.find('.title').text(articleTitle);
    $article.find('.source').text(articleSource);
    $article.find('.short_description').text(articleDescription);
    $article.find('.url a').attr("href", articleUrl).text("Link to Article");
    $article.attr("id","section-"+index);

    return $article;
  }

});
