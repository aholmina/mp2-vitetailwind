import React, { useState } from 'react';

const EventModal = ({ event, onSubmit, onDelete, onClose, darkMode }) => {
  const [eventData, setEventData] = useState(event || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-auto ${darkMode ? 'bg-black bg-opacity-25' : 'bg-black bg-opacity-50'}`}>
      <div className="relative w-full max-w-md mx-auto mt-7">
        <div className={`relative flex flex-col w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg`}>
          <div className={`flex items-start justify-between p-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <h5 className="text-lg font-medium">{event.id ? 'Edit Event' : 'Create Event'}</h5>
            <button
              type="button"
              className="text-2xl leading-none bg-transparent border-none cursor-pointer"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-1 text-sm font-medium">Title:</label>
                <input
                  id="title"
                  type="text"
                  className={`w-full p-2 text-sm border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={eventData.title || ''}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  placeholder="Event title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1 text-sm font-medium">Description:</label>
                <textarea
                  id="description"
                  className={`w-full p-2 text-sm border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={eventData.description || ''}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  placeholder="Event description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block mb-1 text-sm font-medium">Location:</label>
                <input
                  id="location"
                  type="text"
                  className={`w-full p-2 text-sm border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={eventData.location || ''}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="start" className="block mb-1 text-sm font-medium">Start:</label>
                <input
                  id="start"
                  type="datetime-local"
                  className={`w-full p-2 text-sm border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={eventData.start ? eventData.start.slice(0, 16) : ''}
                  onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="end" className="block mb-1 text-sm font-medium">End:</label>
                <input
                  id="end"
                  type="datetime-local"
                  className={`w-full p-2 text-sm border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={eventData.end ? eventData.end.slice(0, 16) : ''}
                  onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={eventData.allDay || false}
                    onChange={(e) => setEventData({ ...eventData, allDay: e.target.checked })}
                  />
                  <span className="ml-2 text-sm font-medium">All Day</span>
                </label>
              </div>
              <div className={`flex justify-end p-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700"
                >
                  {event.id ? 'Update' : 'Create'}
                </button>
                {event.id && (
                  <button
                    type="button"
                    className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded hover:bg-red-700"
                    onClick={() => onDelete(event.id, event.recurringEventId)}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  className="px-4 py-2 ml-2 text-sm font-medium text-white bg-gray-600 border border-gray-600 rounded hover:bg-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
