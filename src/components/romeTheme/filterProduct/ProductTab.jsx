import { useContext, useEffect, useState } from 'react';
import { Row, TabContent, TabPane } from 'reactstrap';
import ProductSection1 from '@/components/parisTheme/productSections/ProductSection1';
import ProductContext from '@/helper/productContext';

const ProductTab = ({ activeTab, filterCategoryData }) => {
  const { productData } = useContext(ProductContext);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const currentCategory = filterCategoryData?.find((cat) => cat.id === activeTab); // finding the active category object by matching its id to the activeTab.
    if (productData?.length > 0 && currentCategory) { //IF PRODUCTS EXIST & CATEGORY IS FOUND, FILTER THEM
      setFilterData(
        productData
          .filter((product) =>
            product?.categories?.some((category) => category.id === currentCategory.id)
          )
          .slice(0, 5)
      );
    }
  }, [productData, activeTab, filterCategoryData]);

  return (
    <TabContent>
      <TabPane>
        <Row className='g-8'>
          <ProductSection1 ProductData={filterData} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} isHeadingVisible={false} />
        </Row>
      </TabPane>
    </TabContent>
  );
};

export default ProductTab;
