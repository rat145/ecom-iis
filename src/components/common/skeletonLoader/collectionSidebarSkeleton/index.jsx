const CollectionSidebarSkeleton = () => {
  const cols = [6, 7, 10, 9, 7, 6, 7, 11, 9, 7, 8, 7, 11, 9, 7, 6, 8, 4, 9, 7];
  return (
    <div className='accordion custome-accordion'>
      <div className='accordion-item skeleton-accordion'>
        <h2 className='accordion-header'>
          <button className='accordion-button' type='button'>
            <span></span>
          </button>
        </h2>
        <div className='accordion-collapse'>
          <div className='accordion-body'>
            <ul className=''>
              {cols?.map((elem, i) => (
                <li className={`placeholder col-${elem}`} key={i}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSidebarSkeleton;
