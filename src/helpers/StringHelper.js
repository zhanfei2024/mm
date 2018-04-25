/**
 * @description slugify
 * @param  {String} text
 * @return {String}
 * @public
 */
function slugify(text) {
  return text.toString().trim()
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[\s]+/g, '-');      // Replace spaces, non-word characters and dashes with a single dash (-)
}

module.exports = {
  slugify: slugify
};
