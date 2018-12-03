export const deepCopy = o => {
  if (undefined === o) return undefined;
  if (null === o) return null;
  let v;
  const output = Array.isArray(o) ? [] : {};
  Object.keys(o).forEach(key => {
    v = o[key];
    output[key] = typeof v === "object" ? deepCopy(v) : v;
  });
  return output;
};

export const generateTodo = ({
  name = "",
  completed = false,
  star = false,
  editing = false,
  comment = ""
}) => {
  return {
    name,
    completed,
    star,
    comment
  };
};
