

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
};

export function bgColor900(color) {
  switch (color) {
    case "blue":
      return "bg-blue-900";
    case "orange":
      return "bg-orange-900";
    case "teal":
      return "bg-teal-900";
    case "pink":
      return "bg-pink-900";
    case "green":
      return "bg-green-900";
    case "yellow":
      return "bg-yellow-900";
    default:
      return "bg-teal-700";
  }
};

export function bgColor700(color) {
  switch (color) {
    case "blue":
      return "bg-blue-700";
    case "orange":
      return "bg-orange-700";
    case "teal":
      return "bg-teal-700";
    case "pink":
      return "bg-pink-700";
    case "green":
      return "bg-green-700";
    case "yellow":
      return "bg-yellow-400";
    default:
      return "bg-teal-700";
  }
};

export function bgColor500(color) {
  switch (color) {
    case "blue":
      return "bg-blue-500";
    case "orange":
      return "bg-orange-500";
    case "teal":
      return "bg-teal-500";
    case "pink":
      return "bg-pink-500";
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    default:
      return "bg-teal-500";
  }
};

export function borderColor900(color) {
  switch (color) {
    case "blue":
      return "border-blue-900";
    case "orange":
      return "border-orange-900";
    case "teal":
      return "border-teal-900";
    case "pink":
      return "border-pink-900";
    case "green":
      return "border-green-900";
    case "yellow":
      return "border-yellow-900";
    default:
      return "border-teal-900";
  }
};

export function borderColor700(color) {
  switch (color) {
    case "blue":
      return "border-blue-700";
    case "orange":
      return "border-orange-700";
    case "teal":
      return "border-teal-700";
    case "pink":
      return "border-pink-700";
    case "green":
      return "border-green-700";
    case "yellow":
      return "border-yellow-700";
    default:
      return "border-teal-700";
  }
};