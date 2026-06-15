import { ApiProperty } from '@nestjs/swagger';
import { getBaseUrl } from '../../utils/baseUrl';

class PageLink {
  @ApiProperty({ example: 2, nullable: true })
  page: number | null;

  @ApiProperty({ example: 'http://example.com/users?page=2', nullable: true })
  url: string | null;
}

export class PageInfo {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  perPage: number;

  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  @ApiProperty({ example: 5 })
  remainingPages: number;

  @ApiProperty({
    example: { page: 2, url: 'http://example.com/users?page=2' },
    nullable: true,
    type: PageLink,
  })
  nextPage: PageLink | null;

  @ApiProperty({
    example: { page: 1, url: 'http://example.com/users?page=1' },
    nullable: true,
    type: PageLink,
  })
  prevPage: PageLink | null;
}

export function getPageInfo(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
): PageInfo {
  const baseUrl = getBaseUrl();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const remainingPages = totalItems > 0 ? totalPages - currentPage : 0;
  const nextPage =
    currentPage < totalPages
      ? {
          page: currentPage + 1,
          url: `${baseUrl}?page=${currentPage + 1}&perPage=${itemsPerPage}`,
        }
      : {
          page: null,
          url: null,
        };
  const prevPage =
    currentPage > 1
      ? {
          page: currentPage - 1,
          url: `${baseUrl}?page=${currentPage - 1}&perPage=${itemsPerPage}`,
        }
      : {
          page: null,
          url: null,
        };

  return {
    page: currentPage,
    perPage: itemsPerPage,
    totalItems,
    totalPages,
    remainingPages,
    nextPage,
    prevPage,
  };
}
