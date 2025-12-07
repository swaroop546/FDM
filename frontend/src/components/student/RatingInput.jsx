const RatingInput = ({ value, onChange }) => {
  const ratings = [
    { value: 1, label: 'Poor', color: 'from-red-500 to-red-600', hoverColor: 'hover:from-red-600 hover:to-red-700' },
    { value: 2, label: 'Below Avg', color: 'from-orange-500 to-orange-600', hoverColor: 'hover:from-orange-600 hover:to-orange-700' },
    { value: 3, label: 'Average', color: 'from-yellow-500 to-yellow-600', hoverColor: 'hover:from-yellow-600 hover:to-yellow-700' },
    { value: 4, label: 'Good', color: 'from-lime-500 to-lime-600', hoverColor: 'hover:from-lime-600 hover:to-lime-700' },
    { value: 5, label: 'Excellent', color: 'from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700' }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {ratings.map((rating) => (
        <button
          key={rating.value}
          type="button"
          onClick={() => onChange(rating.value)}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 shadow-md ${
            value === rating.value
              ? `bg-gradient-to-r ${rating.color} scale-105 ring-2 ring-offset-2 ring-blue-400`
              : `bg-gradient-to-r ${rating.color} opacity-60 ${rating.hoverColor}`
          }`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{rating.value}</div>
            <div className="text-xs mt-1">{rating.label}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
