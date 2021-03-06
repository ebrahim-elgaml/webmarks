/* global localStorage */
import { moduleFor, test } from 'ember-qunit';
import Bookmark from 'webmarks/models/bookmark';

moduleFor('service:storage', 'Unit | Service | storage', {
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('#createTagListCache writes correct list to localStorage', function(assert) {
  let service = this.subject();
  let bookmarks = service.get('archiveBookmarks');

  bookmarks.pushObject(Bookmark.create({
    id: '1',
    url: 'https://webmarks.5apps.com',
    title: 'Webmarks',
    tags: ['unhosted', 'app']
  }));
  bookmarks.pushObject(Bookmark.create({
    id: '2',
    url: 'https://unhosted.org',
    title: 'Unhosted',
    tags: ['unhosted', 'no-backend']
  }));
  bookmarks.pushObject(Bookmark.create({
    id: '3',
    url: 'https://somethingsomethingfoo.bar',
    title: 'Something Something Foo Bar',
    tags: null
  }));

  service.createTagListCache();

  let tags = localStorage.getItem('webmarks:tags');
  assert.equal(tags, 'app,no-backend,unhosted');
});

test('#createTagListCache writes empty list to localStorage when there are no tags', function(assert) {
  let service = this.subject();

  service.createTagListCache();

  let tags = localStorage.getItem('webmarks:tags');
  assert.equal(tags, '');
});

test('#getTagListCache reads tag list from localStorage', function(assert) {
  let service = this.subject();
  localStorage.setItem('webmarks:tags', 'app,no-backend,unhosted');

  let tags = service.getTagListCache();
  assert.deepEqual(tags, ['app','no-backend','unhosted']);
});

test('#deleteTagListCache deletes tag list from localStorage', function(assert) {
  let service = this.subject();
  localStorage.setItem('webmarks:tags', 'app,no-backend,unhosted');

  service.deleteTagListCache();

  assert.equal(localStorage.getItem('webmarks:tags'), null);
});
