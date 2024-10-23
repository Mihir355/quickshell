import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/ticketcard.css";

const TicketCard = ({ selectedGrouping, selectedSorting }) => {
  const [tickets, setTickets] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
      })
      .catch((error) => {
        console.error("There was an error fetching the tickets!", error);
      });
  }, []);

  // Function to sort tickets based on priority or title
  const sortTickets = (groupedTickets) => {
    return groupedTickets.sort((a, b) => {
      if (selectedSorting === "priority") {
        return b.priority - a.priority; // Sort by descending priority
      }
      if (selectedSorting === "title") {
        return a.title.localeCompare(b.title); // Sort by title (A-Z)
      }
      return 0; // Default: no sorting
    });
  };

  // Group tickets based on selected grouping
  const groupedTickets = () => {
    if (selectedGrouping === "status") {
      return {
        backlog: sortTickets(
          tickets.filter((ticket) => ticket.status.toLowerCase() === "backlog")
        ),
        todo: sortTickets(
          tickets.filter((ticket) => ticket.status.toLowerCase() === "todo")
        ),
        inProgress: sortTickets(
          tickets.filter(
            (ticket) => ticket.status.toLowerCase() === "in progress"
          )
        ),
        done: sortTickets(
          tickets.filter((ticket) => ticket.status.toLowerCase() === "done")
        ),
        cancelled: sortTickets(
          tickets.filter(
            (ticket) => ticket.status.toLowerCase() === "cancelled"
          )
        ),
      };
    }

    if (selectedGrouping === "user") {
      return {
        "Anoop Sharma": sortTickets(
          tickets.filter((ticket) => ticket.userId === "usr-1")
        ),
        Yogesh: sortTickets(
          tickets.filter((ticket) => ticket.userId === "usr-2")
        ),
        "Shankar Kumar": sortTickets(
          tickets.filter((ticket) => ticket.userId === "usr-3")
        ),
        Ramesh: sortTickets(
          tickets.filter((ticket) => ticket.userId === "usr-4")
        ),
        Suresh: sortTickets(
          tickets.filter((ticket) => ticket.userId === "usr-5")
        ),
      };
    }

    if (selectedGrouping === "priority") {
      return {
        urgent: sortTickets(tickets.filter((ticket) => ticket.priority === 4)),
        high: sortTickets(tickets.filter((ticket) => ticket.priority === 3)),
        medium: sortTickets(tickets.filter((ticket) => ticket.priority === 2)),
        low: sortTickets(tickets.filter((ticket) => ticket.priority === 1)),
        noPriority: sortTickets(
          tickets.filter((ticket) => ticket.priority === 0)
        ),
      };
    }

    // Default: show all tickets without grouping
    return { all: sortTickets(tickets) };
  };

  const ticketGroups = groupedTickets();

  return (
    <div className="ticket-list">
      <div className="ticket-group-header">
        {Object.keys(ticketGroups).map((group) => (
          <div key={group} className="ticket-group-column">
            <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
            <div className="ticket-group">
              {ticketGroups[group].map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <h4>{ticket.title}</h4>
                  <p>
                    <strong>ID:</strong> {ticket.id}
                  </p>
                  <p>
                    <strong>Tag:</strong> {ticket.tag.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;
