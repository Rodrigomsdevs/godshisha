$("#salvar").click(() => {

   var formData = new FormData();

   formData.append('sku', $("#sku").val());
   formData.append('nome', $("#nome").val());
   formData.append('descricao', $("#descricao").val());
   formData.append('preco', $("#preco").val());
   formData.append('estoque', $("#estoque").val());
   formData.append('categoria', $("#categoria").val());

   var files = $('input[type=file]')[0].files;

   for (var i = 0; i < files.length; i++) {
      formData.append('files' + i, $('input[type=file]')[0].files[i]);
   }


   $.ajax({
      url: '/api/produtos',
      data: formData,
      type: 'POST',
      processData: false,
      contentType: false,
      success: function (data) {
         alert(data);
      }
   });
})