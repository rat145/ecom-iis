'use client';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { LeafSVG } from '../common/CommonSVG';
import { Input, InputGroup } from 'reactstrap';
import WrapperComponent from '../common/WrapperComponent';
import Btn from '@/elements/buttons/Btn';
import { useRouter, useSearchParams } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SearchedData from './SearchedData';
import ProductContext from '@/helper/productContext';

const SearchModule = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [searchState, setSearchState] = useState('');
  const router = useRouter();
   const searchParams = useSearchParams()
   const search = searchParams.get('search')
   const { productData } = useContext(ProductContext);
   const [data,setData]=useState([])
   useEffect(() => {
    search ? setData(productData?.filter(product => product.name.toLowerCase().includes(search?.toLowerCase()))) : setData(productData)
    setSearchState(search);
  }, [search,productData]);
  const onHandleSearch = () => {
    router.push(`/${i18Lang}/search?search=${searchState}`);
  };
  const onChangeHandler = (value) => {
    if (!value) {
      router.push(`/${i18Lang}/search?search=`);
    }
    setSearchState(value);
  };
  return (
    <>
      <Breadcrumb title={'Search'} subNavigation={[{ name: 'Search' }]} />
      <WrapperComponent classes={{ sectionClass: 'search-section', col: 'mx-auto' }} colProps={{ xxl: 6, xl: 8 }}>
        <div className='title d-block text-center'>
          <h2>{t('SearchForProducts')}</h2>
          <span className='title-leaf'>
            <LeafSVG />
          </span>
        </div>

        <div className='search-box'>
          <InputGroup>
            <Input type='text' className='form-control' value={searchState} onChange={(e) => onChangeHandler(e.target.value)} />
            <Btn className='theme-bg-color text-white m-0' type='button' title='Search' onClick={onHandleSearch} />
          </InputGroup>
        </div>
      </WrapperComponent>
      <SearchedData data={data} />
    </>
  );
};

export default SearchModule;