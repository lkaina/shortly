Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  template: _.template(' \
      <div class="sort"> \
        <ul> \
          <li id="visits">Sort By Visits Count</li> \
          <li id="lastVisit">Sort By Last Click</li> \
        </ul> \
      </div>'),

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  events: {
    "click #visits": "sortVisitsCount",
    "click #lastVisit": "sortLastVisit"
  },

  sortLastVisit: function(e){
    e && e.preventDefault();
    this.collection = this.collection.sortByLastVisit();
    this.addAll();
    console.log(this.collection);
  },

  sortVisitsCount: function(e){
    e && e.preventDefault();
    this.collection = this.collection.sortByVisit();
    this.addAll();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.html(this.template()).append(view.render().el);
  }

});