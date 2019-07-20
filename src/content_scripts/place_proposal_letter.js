chrome.storage.sync.get(
  {
    coverLetter: ''
  },
  function (items) {
    var $descriptionTextArea = document.getElementById('descriptionTextArea');

    if ($descriptionTextArea) {
      $descriptionTextArea.value = items.coverLetter;
      $descriptionTextArea.select();
    } else {
      console.log(
        'A textarea field for project proposal is not visible. If you think it is visible and pasting of cover letter did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.'
      );
    }
  }
);
