/* Backbone */
$.ajaxPrefilter( function(options, originalOptions, jqXHR ) {
  options.url = "https://api.pipedrive.com/v1" + options.url + apiKey;
});

/* get all users data */
var User = Backbone.Model.extend();
var Users = Backbone.Collection.extend({
  model: User,
  url: "/users",
  parse: function(data) {
    return data.users;
  }
});

/* get all person fields */
var PersonField = Backbone.Model.extend();
var PersonFields = Backbone.Collection.extend({
  model: PersonField,
  url: "/personFields",
  parse: function(data) {
    return data.personFields;
  }
});

/* render usernames into html table view */
var TableUser = Backbone.View.extend({
  el: $("#users"),
  initialize: function(){
    this.render();
  },
  render: function(){
    var that = this;
    var users = new Users();
    users.fetch({
      success: function(users){
        console.log(users.toJSON + " USERS");
        var variable = {users:users.models.toJSON};
        console.log(variable);
        var template = _.template($('#users_template').html());
        that.$el.html(template(variable));
      }
    });
  }
});

var tableUser = new TableUser();

/* render person fields in main area */
var PersonTable = Backbone.View.extend({
  el: $("#person-fields"),

  initialize: function(){
    this.render();
  },
  render: function(){
    var that = this;
    var personFields = new PersonFields();
    personFields.fetch({
      success: function(personFields){
        var variable = {personFields:personFields.models};
        var template = _.template($("#person_template").html());
        that.$el.html(template(variable));
      }
    });
  }
});

/* make new route to show person fields when clicked on a user link? */
var Router = Backbone.Router.extend({
  routes: {
    "" : "home",
  }
});


var personTable = new PersonTable();

var router = new Router();
router.on("route:home", function (){
  tableUser.render();
  personTable.render();
});

Backbone.history.start();

/* XMLHttpRequest
var apiKey = "fd3d4c0e7c7f7e72e6cd1cc61a87d336ba712003";
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.pipedrive.com/v1/users?api_token=" + apiKey + "", false);
xhr.send();

console.log(xhr.status + xhr.statusText); */


/*Menu-toggle*/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});

/*Scroll Spy*/
$('body').scrollspy({ target: '#spy', offset:80});

/*Smooth link animation*/
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});
