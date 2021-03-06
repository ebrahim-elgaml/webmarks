import Ember from 'ember';

export default Ember.Object.extend({

  id: '',
  url: '',
  title: '',
  description: '',
  tags: [],
  createdAt: null,
  updatedAt: null,

  createdAtTimeAgo: function() {
    return moment(this.get('createdAt')).fromNow();
  }.property('createdAt'),

  updatedAtTimeAgo: function() {
    return moment(this.get('updatedAt')).fromNow();
  }.property('updatedAt'),

  domain: function() {
    var a = document.createElement('a');
    a.href = this.get('url');
    return a.hostname;
  }.property('url'),

  serialize: function() {
    var serialized = this.getProperties('url', 'title', 'description');
    var tags = this.get('tags');

    var createdAt = this.get('createdAt');
    if (createdAt !== null) {
      serialized.createdAt = createdAt;
    }

    if (tags && tags.length > 0) {
      if ((typeof tags) === 'string') { tags = tags.split(','); }

      serialized.tags = tags.map(Ember.$.trim)
                            .reject(t => Ember.isEmpty(t));
    }

    return serialized;
  }.property('url', 'title', 'description', 'tags', 'createdAt')

});
