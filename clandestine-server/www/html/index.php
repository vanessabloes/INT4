<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy as RouteCollectorProxy;

require __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set('UTC');

require __DIR__ . '/../dao/MemberDAO.php';
require __DIR__ . '/../dao/ClanDAO.php';
require __DIR__ . '/../dao/JourneyDAO.php';
require __DIR__ . '/../dao/WayfarerDAO.php';
require __DIR__ . '/../dao/RoleDAO.php';
require __DIR__ . '/../dao/StoryDAO.php';

require __DIR__ . '/../dao/TopMaskDAO.php';
require __DIR__ . '/../dao/MiddleMaskDAO.php';
require __DIR__ . '/../dao/BottomMaskDAO.php';
require __DIR__ . '/../dao/WordDAO.php';
require __DIR__ . '/../dao/DefinedWordDAO.php';
require __DIR__ . '/../dao/DefinedStoryWordDAO.php';

/**
 * Instantiate App
 *
 * In order for the factory to work you need to ensure you have installed
 * a supported PSR-7 implementation of your choice e.g.: Slim PSR-7 and a supported
 * ServerRequest creator (included with Slim PSR-7)
 */
$app = AppFactory::create();

// Add Routing Middleware
$app->addRoutingMiddleware();

$app->addBodyParsingMiddleware();

/**
 * Add Error Handling Middleware
 *
 * @param bool $displayErrorDetails -> Should be set to false in production
 * @param bool $logErrors -> Parameter is passed to the default ErrorHandler
 * @param bool $logErrorDetails -> Display error details in error log
 * which can be replaced by a callable of your choice.

 * Note: This middleware should be added last. It will not handle any exceptions/errors
 * for middleware added after it.
 */
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Define app routes

$app->group('/api', function (RouteCollectorProxy $routeGroup) {


  $routeGroup->group('/definedwords', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $definedwordDAO = new DefinedWordDAO();
      $data = $definedwordDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

  });
  $routeGroup->group('/definedstorywords', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $definedStoryWord = new DefinedStoryWordDAO();
      $data = $definedStoryWord->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
    $routeGroup->post('', function (Request $request, Response $response) {
      $definedStoryWordDAO = new DefinedStoryWordDAO();
      $data = $request->getParsedBody();
      $errors = $definedStoryWordDAO->getValidationErrors($data);
      if(!empty($errors)){
        $response->getBody()->write(json_encode($errors));
        return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(422);
      }
  
      $result = $definedStoryWordDAO->insert($data);
      $response->getBody()->write(json_encode($result));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });
  $routeGroup->group('/words', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $wordDAO = new WordDAO();
      $data = $wordDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

  });

  $routeGroup->group('/roles', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $roleDAO = new RoleDAO();
      $data = $roleDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

  });


  $routeGroup->group('/stories', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $storyDAO = new StoryDAO();
      $data = $storyDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
    $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
      $storyDAO = new StoryDAO();
      $data = $storyDAO->selectById($args['id']);
      if (empty($data)) {
        return $response
              ->withStatus(404);
      }
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    $routeGroup->get('/{id}/words', function (Request $request, Response $response, $args) {
      $storyDAO = new StoryDAO();
      $data = $storyDAO->selectWordsForStory($args['id']);
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    $routeGroup->get('/{id}/contexts/{contextId}', function (Request $request, Response $response, $args) {
      $storyDAO = new StoryDAO();
      $data = $storyDAO->selectContextForStory($args['id'], $args['contextId']);
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    
  
    $routeGroup->post('', function (Request $request, Response $response) {
      $storyDAO = new StoryDAO();
      $data = $request->getParsedBody();
      $errors = $storyDAO->getValidationErrors($data);
      if(!empty($errors)){
        $response->getBody()->write(json_encode($errors));
        return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(422);
      }
  
      $result = $storyDAO->insert($data);
      $response->getBody()->write(json_encode($result));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });

  $routeGroup->group('/topmasks', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $topMaskDAO = new TopMaskDAO();
      $data = $topMaskDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
 
  });

  $routeGroup->group('/middlemasks', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $middleMaskDAO = new MiddleMaskDAO();
      $data = $middleMaskDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

  });

  $routeGroup->group('/bottommasks', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $bottomMaskDAO = new BottomMaskDAO();
      $data = $bottomMaskDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });

  $routeGroup->group('/wayfarers', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $wayfarerDAO = new WayfarerDAO();
      $data = $wayfarerDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
   

  $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
    $wayfarerDAO = new WayfarerDAO();
    $data = $wayfarerDAO->selectById($args['id']);
    if (empty($data)) {
      return $response
            ->withStatus(404);
    }
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->post('', function (Request $request, Response $response) {
    $wayfarerDAO = new WayfarerDAO();
    $data = $request->getParsedBody();
    $errors = $wayfarerDAO->getValidationErrors($data);
    if(!empty($errors)){
      $response->getBody()->write(json_encode($errors));
      return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(422);
    }

    $result = $wayfarerDAO->insert($data);
    $response->getBody()->write(json_encode($result));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  
});
 $routeGroup->group('/journeys', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $journeyDAO = new JourneyDAO();
      $data = $journeyDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
   

  $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
    $journeyDAO = new JourneyDAO();
    $data = $journeyDAO->selectById($args['id']);
    if (empty($data)) {
      return $response
            ->withStatus(404);
    }
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->get('/{id}/wayfarers', function (Request $request, Response $response, $args) {
    $journeyDAO = new JourneyDAO();
    $data = $journeyDAO->selectWayfarersForJourney($args['id']);
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });


  $routeGroup->get('/{id}/stories', function (Request $request, Response $response, $args) {
    $journeyDAO = new JourneyDAO();
    $data = $journeyDAO->selectStoriesForJourney($args['id']);
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->post('', function (Request $request, Response $response) {
    $journeyDAO = new JourneyDAO();
    $data = $request->getParsedBody();
    $errors = $journeyDAO->getValidationErrors($data);
    if(!empty($errors)){
      $response->getBody()->write(json_encode($errors));
      return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(422);
    }

    $result = $journeyDAO->insert($data);
    $response->getBody()->write(json_encode($result));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  
});
  $routeGroup->group('/clans', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $clanDAO = new ClanDAO();
      $data = $clanDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
   

  $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
    $clanDAO = new ClanDAO();
    $data = $clanDAO->selectById($args['id']);
    if (empty($data)) {
      return $response
            ->withStatus(404);
    }
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->get('/{id}/members', function (Request $request, Response $response, $args) {
    $clanDAO = new ClanDAO();
    $data = $clanDAO->selectMembersForClan($args['id']);
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->post('', function (Request $request, Response $response) {
    $clanDAO = new ClanDAO();
    $data = $request->getParsedBody();
    $errors = $clanDAO->getValidationErrors($data);
    if(!empty($errors)){
      $response->getBody()->write(json_encode($errors));
      return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(422);
    }

    $result = $clanDAO->insert($data);
    $response->getBody()->write(json_encode($result));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  
});

  $routeGroup->group('/members', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $memberDAO = new MemberDAO();
      $data = $memberDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
   

  $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
    $memberDAO = new MemberDAO();
    $data = $memberDAO->selectById($args['id']);
    if (empty($data)) {
      return $response
            ->withStatus(404);
    }
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->post('', function (Request $request, Response $response) {
    $memberDAO = new MemberDAO();
    $data = $request->getParsedBody();
    $errors = $memberDAO->getValidationErrors($data);
    if(!empty($errors)){
      $response->getBody()->write(json_encode($errors));
      return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(422);
    }

    $result = $memberDAO->insert($data);
    $response->getBody()->write(json_encode($result));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  
});
 
});

// Run app
$app->run();