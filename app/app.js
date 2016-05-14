import Resolver from 'ember/resolver';
import Bookmark from 'appkit/models/bookmark';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: false,
  LOG_MODULE_RESOLVER: false,
  LOG_TRANSITIONS: false,
  LOG_TRANSITIONS_INTERNAL: false,
  LOG_VIEW_LOOKUPS: false,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default'],
  rsConnecting: false,
  rsConnected: remoteStorage.connected
});

App.initializer({
  name: "remoteStorage",
  initialize: function(container, application) {
    remoteStorage.access.claim('bookmarks', 'rw');
    remoteStorage.caching.enable('/bookmarks/archive/');
    remoteStorage.displayWidget('remotestorage-connect', { redirectUri: window.location.href });

    // var dictionary = {
    //   "view_info": 'This app allows you to use your own storage. <a href="http://remotestorage.io/" target="_blank">Learn more!</a>',
    //   "view_connect": "<strong>Connect</strong> remote storage",
    //   "view_connecting": "Connecting <strong>%s</strong>",
    //   "view_offline": "Offline",
    //   "view_error_occured": "Sorry! An error occured.",
    //   "view_confirm_reset": "Are you sure you want to reset everything? This will clear your local data and reload the page.",
    //   "view_get_me_out": "Get me out of here!",
    //   "view_error_plz_report": 'If this problem persists, please <a href="http://remotestorage.io/community/" target="_blank">let us know</a>!',
    //   "view_unauthorized": "Unauthorized! Click here to reconnect."
    // };
    // RemoteStorage.I18n.setDictionary(dictionary);

    remoteStorage.on('ready', function() {
      console.log('rs.on ready');
      // application.set('rsConnecting', false);
      // application.set('rsConnected', false);
    });
    remoteStorage.on('connected', function() {
      console.log('rs.on connected');
      application.set('rsConnecting', false);
      application.set('rsConnected', true);
    });
    remoteStorage.on('not-connected', function() {
      console.log('rs.on not-connected');
      application.set('rsConnecting', false);
      application.set('rsConnected', false);
    });
    remoteStorage.on('disconnected', function() {
      console.log('rs.on disconnected');
      application.set('rsConnecting', false);
      application.set('rsConnected', false);

      application.set('archiveBookmarks', []);
    });
    remoteStorage.on('connecting', function() {
      console.log('rs.on connecting');
      application.set('rsConnecting', true);
      application.set('rsConnected', false);
    });
    remoteStorage.on('authing', function() {
      console.log('rs.on authing');
      application.set('rsConnecting', true);
      application.set('rsConnected', false);
    });
  }
});

export default App;
