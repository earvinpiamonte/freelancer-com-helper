chrome.storage.sync.get({coverLetter:""},function(e){var t=document.getElementById("descriptionTextArea");t?(t.value=e.coverLetter,t.select()):console.log("A textarea field for project proposal is not visible. If you think it is visible and pasting of cover letter did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.")});