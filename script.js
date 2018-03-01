//API key: d30032dc58a7c22e3f471a74999361eb

// All search requests should be made to the base search API URL. http://food2fork.com/api/search
// All recipe requests should be made to this URL: http://food2fork.com/api/get
//ex:http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken


var app = new Vue({
  el: '#app',
  data: {
    healthRadio: "alcohol-free",
    dietRadio: "balanced",
    value: "",
    first: 0,
    last: 10,
    showNext: false,
    showPrev: false,
  },
  computed:{

  },
  methods:{
    chooseNext: function(){
      this.first = this.first + 10;
      this.last = this.last + 10;

      if(app.value !== ""){

        if(app.healthRadio == "" && app.dietRadio == ""){
          searchNone(app.value, app.first, app.last);
        }else if(app.healthRadio == ""){
          searchDiet(app.value, app.diet, app.first, app.last);
        }else if(app.dietRadio == ""){
          searchHealth(app.value, app.health, app.first, app.last);
        }else {
          searchAll(app.value, app.dietRadio, app.healthRadio, app.first, app.last);

        }
        this.showPrev = true;
      }else{
        alert("Input a search word");
      }

    },
    choosePrev: function(){
      if(this.first != 0){
        this.first = this.first - 10;
        this.last = this.last - 10;

        if(this.first == 0){
          this.showPrev = false;
        }

        if(app.value !== ""){
          if(app.healthRadio == "" && app.dietRadio == ""){
            searchNone(app.value, app.first, app.last);
          }else if(app.healthRadio == ""){
            searchDiet(app.value, app.diet, app.first, app.last);
          }else if(app.dietRadio == ""){
            searchHealth(app.value, app.health, app.first, app.last);
          }else {
            searchAll(app.value, app.dietRadio, app.healthRadio, app.first, app.last);

          }
        }else{
          alert("Input a search word");
        }
      }
    },
    submitSearch: function(){
      app.first = 0;
      app.last = 10;

      if(app.value !== ""){

        if(app.healthRadio == "" && app.dietRadio == ""){
          searchNone(app.value, app.first, app.last);
        }else if(app.healthRadio == ""){
          searchDiet(app.value, app.diet, app.first, app.last);
        }else if(app.dietRadio == ""){
          searchHealth(app.value, app.health, app.first, app.last);
        }else {
          searchAll(app.value, app.dietRadio, app.healthRadio, app.first, app.last);

        }
        this.showNext = true;
      }else{
        alert("Input a search word");
      }
    },

  },
});


function searchAll(value, diet, health, first, last){
  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", diet: diet, health: health, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + Math.round(json.hits[i].recipe.calories) + '</p>';
        results += '<p><b>Servings</b>: ' + json.hits[i].recipe.yield + '</p>';
              results += '<p><b>Calories per Serving</b>: ' + Math.round(json.hits[i].recipe.calories / json.hits[i].recipe.yield) + '</p>';

              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          console.log(results);
          $('#background').css('background', 'url(' + json.hits[0].recipe.image + ')');
          $("#foodDisplay").html(results);
      }
  });
}

function searchNone(value, first, last){
  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", diet: diet, health: health, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + Math.round(json.hits[i].recipe.calories) + '</p>';
        results += '<p><b>Servings</b>: ' + json.hits[i].recipe.yield + '</p>';
              results += '<p><b>Calories per Serving</b>: ' + Math.round(json.hits[i].recipe.calories / json.hits[i].recipe.yield) + '</p>';

              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          console.log(results);
          $("#foodDisplay").html(results);
      }
  });
}

function searchDiet(value, diet, first, last){
  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", diet: diet, health: health, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + Math.round(json.hits[i].recipe.calories) + '</p>';
        results += '<p><b>Servings</b>: ' + json.hits[i].recipe.yield + '</p>';
              results += '<p><b>Calories per Serving</b>: ' + Math.round(json.hits[i].recipe.calories / json.hits[i].recipe.yield) + '</p>';

              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          console.log(results);
          $("#foodDisplay").html(results);
      }
  });
}

function searchHealth(value, health, first, last){
  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", diet: diet, health: health, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + Math.round(json.hits[i].recipe.calories) + '</p>';
        results += '<p><b>Servings</b>: ' + json.hits[i].recipe.yield + '</p>';
              results += '<p><b>Calories per Serving</b>: ' + Math.round(json.hits[i].recipe.calories / json.hits[i].recipe.yield) + '</p>';

              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          console.log(results);
          $("#foodDisplay").html(results);
      }
  });
}
