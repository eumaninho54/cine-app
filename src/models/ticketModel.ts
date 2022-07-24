import { dataMoviesToBuy } from "./moviesModel";

export interface ticketContextProps {
  ticketsToBuy: dataMoviesToBuy[];
  setTicketsToBuy: React.Dispatch<React.SetStateAction<dataMoviesToBuy[]>>;
}
