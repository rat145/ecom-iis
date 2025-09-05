import { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from 'reactstrap';
import { filterPrice } from '../../../data/Custom';
import I18NextContext from '@/helper/i18NextContext';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/helper/settingContext';

const CollectionPrice = ({ filter, setFilter, attributeAPIData }) => {
  const { convertCurrency } = useContext(SettingContext);
  const router = useRouter();
  const [category, attribute, sortBy, field, rating, layout] = useCustomSearchParams(['category', 'attribute', 'sortBy', 'field', 'rating', 'layout']);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const pathname = usePathname();
  const checkPrice = (value) => {
    if (filter?.price?.indexOf(value) != -1) {
      return true;
    } else return false;
  };
  const applyPrice = (event) => {
    const index = filter?.price.indexOf(event?.target?.value);
    let temp = [...filter?.price];
    if (event.target.checked) {
      temp.push(event?.target?.value);
    } else {
      temp.splice(index, 1);
    }
    setFilter((prev) => {
      return {
        ...prev,
        price: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout, price: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <AccordionItem>
      <AccordionHeader targetId={(attributeAPIData?.length + 2).toString()}>
        <span>{t('Price')}</span>
      </AccordionHeader>
      <AccordionBody accordionId={(attributeAPIData?.length + 2).toString()}>
        <ul className='category-list custom-padding custom-height'>
          {filterPrice.map((price, i) => (
            <li key={i}>
              <div className='form-check category-list-box'>
                <Input className='checkbox_animated' type='checkbox' id={`price-${price.id}`} value={price?.value} checked={checkPrice(price?.value)} onChange={applyPrice} />
                <Label className='form-check-label' htmlFor={`price-${price.id}`}>
                  {price?.price ? (
                    <span className='name'>
                      {price.text} {convertCurrency(price.price)}
                    </span>
                  ) : (
                    <span className='name'>
                      {convertCurrency(price.minPrice)} - {convertCurrency(price.maxPrice)}
                    </span>
                  )}
                </Label>
              </div>
            </li>
          ))}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionPrice;
