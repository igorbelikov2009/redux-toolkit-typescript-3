import React, { useState, useMemo } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { IFilter, IProduct, IOption } from "../models/types";
import { productAPI } from "../services/ProductService";
import PaginationButtons from "../components/ui/PaginationButtons";
import ProductItem from "../components/items/ProductItem";
import SortFilter from "../components/SortFilter";

const ProductApiPage = () => {
  //================================================================================
  // PAGINATION

  const { data } = productAPI.useFetchAllPdoructsQuery();

  let totalCount: number = 0;
  if (data) {
    totalCount = data.length;
  }
  // Получаем limit, page по параметрам, установленным в postPaginationAPI в эндпоинте:

  const [page, setPage] = useState<number>(1);
  // Здесь, limit у нас взят так же из параметров, для расчётов. Здесь мы его не можем
  // менять. В дальнейшем, limit надо будет получать из параметра запроса.
  const [limit] = useState<number>(10);
  let countPage: number = Math.ceil(totalCount / limit);
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  // PAGINATION
  //================================================================================

  // Получаем массив products с сервера постранично
  const { data: products, error, isLoading } = productAPI.useGetProductsPaginationQuery(page);

  const [createProduct, { error: createError }] = productAPI.useCreateProductMutation();
  const [updateProduct, { error: updateError }] = productAPI.useUpdateProductMutation();
  const [deleteProduct, { error: deleteError }] = productAPI.useDeleteProductMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название продукта") || "";
    const price = Number(prompt("Введите стоимость продукта") || "");
    const description = prompt("Введите описание продукта") || "";
    const category = prompt("Введите категорию продукта") || "";
    const image = prompt("Введите url продукта") || "";
    const rate = Number(prompt("Введите рейтинг продукта") || "");
    const count = Number(prompt("Введите количество оценок продукта") || "");

    await createProduct({ title, price, description, category, image, rating: { rate, count } } as unknown as IProduct);
  };

  const handleUpdate = (product: IProduct) => {
    updateProduct(product);
  };
  const handleRemove = (product: IProduct) => {
    deleteProduct(product);
  };

  //==============================
  // Сортировка
  const options: IOption[] = [
    { value: "id", name: "По номеру продукта" },
    { value: "title", name: "По названию продукта" },
    { value: "price", name: "По стоимости продукта" },
    { value: "category", name: "По категории продукта" },
  ];
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });

  // Получаем отсортированный массив.
  const sortedProducts = useMemo(() => {
    if (filter.sort && products) {
      return [...products].sort((a, b) => (a[filter.sort] > b[filter.sort] ? 1 : -1));
    }
    return products;
  }, [products, filter.sort]);

  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedProducts = useMemo(() => {
    if (sortedProducts) {
      return sortedProducts.filter((product) => product.title.toLowerCase().includes(filter.query));
    }
  }, [sortedProducts, filter.query]);

  // Сортировка
  //==============================

  return (
    <Container className="card">
      <Row>
        <div>
          <h3 className="textCenter"> Список продуктов из productAPI.</h3>

          <div className="containerButton">
            <div className="card mr-2">
              <Button variant="outline-success" onClick={handleCreate}>
                Добавить новый продукт
              </Button>
            </div>

            <SortFilter
              filter={filter}
              options={options}
              setFilter={setFilter}
              placeholder="Поиск по названию продукта..."
            />
          </div>

          <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

          <div> {isLoading && <h1 className="textCenter"> Идёт загрузка </h1>} </div>
          <div>
            {error && (
              <>
                <h1 className="textCenter">Ошибка при загрузке</h1>
              </>
            )}
            {createError && (
              <>
                <h1 className="textCenter">Ошибка при создании</h1>
              </>
            )}
            {updateError && (
              <>
                <h1 className="textCenter">Ошибка при обновлении</h1>
              </>
            )}
            {deleteError && (
              <>
                <h1 className="textCenter">Ошибка при удалении</h1>
              </>
            )}
          </div>

          <div className="card">
            {sortedAndSearchedProducts &&
              sortedAndSearchedProducts.map((product) => (
                <ProductItem key={product.id} product={product} update={handleUpdate} remove={handleRemove} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default ProductApiPage;
