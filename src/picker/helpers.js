
/**
 * @param list {array} list passed from prop
 * @param id {string} id of selected item
 * @returns {array}
 *
 * sets the check value of the item that matched the id param to true
 * unchecks all other items to remove possible previously selected item(s),
 * returns the updated list
 */
export function updateList(_list, id) {
  const list = JSON.parse(JSON.stringify(_list));
  if (!Array.isArray(list)) {
    throw new Error('invalid argument provided. Array expected');
  }
  const value = list.find(item => item.id === id);
  // eslint-disable-next-line eqeqeq
  if (value.checked != undefined && value.checked === false) {
    value.checked = true;
  }

  const prevSelectedIndex = _list.findIndex(item => item.checked);
  if (prevSelectedIndex !== -1) {
    const previous = { ...list[prevSelectedIndex] };
    previous.checked = false;
  }

  // list.map((item) => {
  //   if (item.id !== id) {
  //     item.checked = false; // eslint-disable-line no-param-reassign
  //   }
  // });
  return list;
}

export function updateListOnMount(_list, name, useValue = false) {
  const list = JSON.parse(JSON.stringify(_list));
  if (useValue) {
    const value = list.find(item => item.value === name);
    if (value) {
      const checkedFromList = list.find(item => item.value === value.value);
      if (checkedFromList) checkedFromList.checked = true;
    }
    return list;
  }
  const value = list.find(item => item.name === name);
  if (value) {
    const checkedFromList = list.find(item => item.name === value.name);
    if (checkedFromList) checkedFromList.checked = true;
  }
  return list;

  // if (useValue) {
  //   value = _list.find(item => item.value === name);
  //   if (value) {
  //     list = _list.map((item) => {
  //       if (item.value === value.value) {
  //         item.checked = true; // eslint-disable-line no-param-reassign
  //       }
  //       return item;
  //     });
  //     return list;
  //   }
  // }
  // value = _list.find(item => item.name === name);
  // if (value) {
  //   list = _list.map((item) => {
  //     if (item.name === value.name) {
  //       item.checked = true; // eslint-disable-line no-param-reassign
  //     }
  //     return item;
  //   });
  //   return list;
  // }
  // return list;
}

export function getSelectedFromName(list = [], name, useValue) {
  return useValue ? list.find(item => item.value === name) : list.find(item => item.name === name);
}

export function uncheckonUnmount(list = []) {
  return list.map((item) => {
    item.checked = false; // eslint-disable-line no-param-reassign
  });
}
