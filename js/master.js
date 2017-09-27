// TOASTR OPTIONS
toastr.options = {
  newestOnTop: true,
  progressBar: true,
  extendedTimeOut: '2500'
};

// LISTENERS
$(document).ready(function () {
  // MAKE SURE BUTTON IS ONLY ACTIVE WHEN REQUIRED FIELDS ARE GOOD
  $('input').change(function () {
    $('#getEmbed').attr('disabled', $('input[required]').toArray().some(function (el) {
      return el.value.length === 0;
    }));
  });

  // SET BUTTON LISTENER
  $('#getEmbed').click(getEmbedUrl);
});

// POST CALL TO WISTIA AND BUILD THUMBNAIL AND URL
function getEmbedUrl() {
  // JQUERY VARS
  var url = $('#wistiaURL');
  var gifUrl = $('#gifURL');  

  // GET / SET VALUES FROM INPUT FIELDS
  var mediaHashedId = url.val().match(/medias\/(\w{10})/)[1];

  function createEmbedUrl(hashedId,gif) {

    // DISPLAY EMBED URL
    document.getElementById("url").innerHTML =`
&lt;script&gt;
window._wq = window._wq || [];
_wq.push({
  id: ` + hashedId + `,
  options: {
    "stillUrl": "` + gif + `"
  }
});
&lt;/script&gt;
&lt;script src="https://fast.wistia.com/embed/medias/` + hashedId + `.jsonp" async&gt;&lt;/script&gt;
&lt;script src="https://fast.wistia.com/assets/external/E-v1.js" async&gt;&lt;/script&gt;
&lt;div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"&gt;
  &lt;div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"&gt;
    &lt;div class="wistia_embed wistia_async_` + hashedId + ` videoFoam=true" style="height:100%;width:100%"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;`;
    
    document.getElementById("videoEmbed").className += " wistia_async_" + hashedId;
    document.getElementById("videoEmbed").classList.remove("video-frame");
    window._wq = window._wq || [];
      _wq.push({
        id: hashedId,
        options: {
          "stillUrl": gif
        }
      });
  };

  createEmbedUrl(mediaHashedId, gifUrl.val());
}

function reset() {
  $('.dynamic').val('');
  document.getElementById("getEmbed").disabled = true;
}
