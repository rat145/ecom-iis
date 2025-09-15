import Link from 'next/link';
import Avatar from '../Avatar';
import { placeHolderImage } from '../../../data/CommonPath';

const CategoryBox1 = ({ CategoryData, classes = {} }) => {
  return (
    <>
      {CategoryData?.map((elem) => (
        <div key={elem?.id} className={classes?.divClass || ''}>
          <Link href='/' className='category-box category-dark'>
            <div>
              <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem.name} customClass={classes?.customClass} />
              <h5>{elem.name}</h5>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CategoryBox1;
